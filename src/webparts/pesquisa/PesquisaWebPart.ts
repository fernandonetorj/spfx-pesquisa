import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'PesquisaWebPartStrings';

import { sp, ItemAddResult } from '@pnp/sp';
import * as $ from "jquery";
import "bootstrap";

require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css');

//css padrao
require('../../stylelibrary/css/padraoPesquisa.css');

//import toast
require('../../stylelibrary/css/toastr.min.css');
import toastr from '../../stylelibrary/js/toast/toastr.min.js';

export interface IPesquisaWebPartProps {
  description: string;
}

export default class PesquisaWebPart extends BaseClientSideWebPart <IPesquisaWebPartProps> {


  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }


  public render(): void {

    //carrega o template de layout
    this.domElement.innerHTML = require("./template.html");

    document.getElementById("btnListar").addEventListener("click", () => this.pesquisarCadastrado());

    this.ObterTodasAreas();

  }


  public async ObterTodasAreas() {

    let montahtmlAreas;

    await sp.web.lists
      .getByTitle("Areas")
      .items.top(5000)
      .select("ID, Title")
      .orderBy("Title",true)
      .get()
      .then(items => {

        montahtmlAreas = `<option value="" disabled selected hidden></option>`;
        items.forEach(element => {
          montahtmlAreas += `<option value="${element.Title}">${element.Title}</option>`;
        });

        $("#ddlArea").html(montahtmlAreas);

      })
      .catch(e => {
        console.log("erro", e);
      });
  }






 public async pesquisarCadastrado() {
    let nomeFiltro1;
    let tenant = 'https://petrobrasdistribuidora.sharepoint.com'
    const pageSize: number = 3; // Number of items to retrieve per page
    let currentPage: number = 1; // Current page number


    this.limparResultado();
    nomeFiltro1 = '552233'


    await sp.web.lists
      .getByTitle("Docs")
      .items
      .select("ID", "FileLeafRef", "numero", "FileDirRef", "FileRef")
      .filter(`substringof('${nomeFiltro1}', numero)`)
      .top(pageSize)
      .skip((currentPage -1) * pageSize)
      .get()
      .then(items => {
        items.forEach(item => {
          console.log(item.FileLeafRef);
          document.getElementById("result").innerHTML += `Id: ${item.ID} ||||| Pasta: ${item.FileDirRef} ||||| Nome: ${item.FileLeafRef} ||||| link: ${tenant + item.FileRef} ||||  Coluna Número: ${item.numero}`;
          document.getElementById("result").innerHTML += `<P></P>`;

        });

      })
      .catch(error => {
        console.error(error);
      });

  }





 /*

  public async pesquisarCadastrado() {
    let nomeFiltro1;
    let tenant = 'https://petrobrasdistribuidora.sharepoint.com'

    this.limparResultado();
    nomeFiltro1 = '552233'


    await sp.web.lists
      .getByTitle("Docs")
      .items
      .select("ID", "FileLeafRef", "numero", "FileDirRef", "FileRef")
      .filter(`substringof('${nomeFiltro1}', numero)`)
      .top(100)
      .get()
      .then(items => {
        items.forEach(item => {
          console.log(item.FileLeafRef);
          document.getElementById("result").innerHTML += `Id: ${item.ID} ||||| Pasta: ${item.FileDirRef} ||||| Nome: ${item.FileLeafRef} ||||| link: ${tenant + item.FileRef} ||||  Coluna Número: ${item.numero}`;
          document.getElementById("result").innerHTML += `<P></P>`;

        });

      })
      .catch(error => {
        console.error(error);
      });

  }
 */









  public async limparResultado() {
    document.getElementById("result").innerHTML = "";

}




  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
}
