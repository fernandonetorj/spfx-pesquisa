import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "bootstrap";
export interface ICadastroWebPartProps {
    description: string;
}
export default class CadastroWebPart extends BaseClientSideWebPart<ICadastroWebPartProps> {
    onInit(): Promise<void>;
    render(): void;
    ObterTodasAreas(): Promise<void>;
    protected SalvarAniversariante(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=CadastroWebPart.d.ts.map