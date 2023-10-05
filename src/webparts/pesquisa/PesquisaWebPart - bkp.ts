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

    //let montahtmlAniversariantes;
    let nomeFiltro1;
    let nomeFiltro2;

    //nomeFiltro1 = this.domElement.querySelectorAll('.txtNome');
    //nomeFiltro1 = document.getElementById('txtNome').value;
    //nomeFiltro1 = document.getElementById('txtNome')["value"];
    //nomeFiltro2 = document.getElementById('ddlArea');
    nomeFiltro1 = 'Samuel';
    nomeFiltro2 = 'RH';

    this.limparResultado();

    await sp.web.lists
      .getByTitle("Cadastro")
      //.getByTitle("Docs")
      .items.top(5000)
      //.select("ID, File, Empresa")
      .select("ID, Title, Area")
      //.filter(`substringof('${nomeFiltro1}', Empresa)`)
      .filter(`substringof('${nomeFiltro1}', Title) and Area eq '${nomeFiltro2}'`)
      //.filter(`substringof('Samuel', Title)`)
      //.expand('File')
      .orderBy("Title",true)
      .get()
      .then(items => {


        items.forEach(element => {
          //console.log(`Nome: ${element.Title} --  Area: ${element.Area}`);
          console.log(`nomeFiltro1: ${nomeFiltro1}`);
          document.getElementById("result").innerHTML +=  `Nome: ${element.Title} -- Arquivo: ${element.Area}`;
          document.getElementById("result").innerHTML += `<P></P>`;
        });


      })
      .catch(e => {
        console.log("erro", e);
      });
  }




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
