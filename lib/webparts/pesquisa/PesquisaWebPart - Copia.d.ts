import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "bootstrap";
export interface IPesquisaWebPartProps {
    description: string;
}
export default class PesquisaWebPart extends BaseClientSideWebPart<IPesquisaWebPartProps> {
    onInit(): Promise<void>;
    render(): void;
    ObterTodasAreas(): Promise<void>;
    pesquisarCadastrado(): Promise<void>;
    limparResultado(): Promise<void>;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=PesquisaWebPart - Copia.d.ts.map