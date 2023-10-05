var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'CadastroWebPartStrings';
import { sp } from "@pnp/sp";
import * as $ from "jquery";
import "bootstrap";
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css');
//css padrao
require('../../stylelibrary/css/padrao.css');
//importa toast
require('../../stylelibrary/css/toastr.min.css');
import toastr from '../../stylelibrary/js/toast/toastr.min.js';
var CadastroWebPart = /** @class */ (function (_super) {
    __extends(CadastroWebPart, _super);
    function CadastroWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Iniciar o SPFX
    CadastroWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            sp.setup({
                spfxContext: _this.context
            });
        });
    };
    // Renderizar a webpart
    CadastroWebPart.prototype.render = function () {
        var _this = this;
        //carrego o template de layout
        this.domElement.innerHTML = require("./template.html");
        document
            .getElementById("btnSalvar")
            .addEventListener("click", function () { return _this.SalvarAniversariante(); });
        this.ObterTodasAreas();
    };
    // Carrega Areas de lista Areas
    CadastroWebPart.prototype.ObterTodasAreas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var montahtmlAreas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists
                            .getByTitle("Areas")
                            .items.top(5000)
                            .select("ID, Title")
                            .orderBy("Title", true)
                            .get()
                            .then(function (items) {
                            montahtmlAreas = "<option value=\"\">Selecione</option>";
                            items.forEach(function (element) {
                                montahtmlAreas += "<option value=\"" + element.Title + "\">" + element.Title + "</option>";
                            });
                            $("#ddlArea").html(montahtmlAreas);
                        })
                            .catch(function (e) {
                            console.log("erro", e);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CadastroWebPart.prototype.SalvarAniversariante = function () {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "4000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        var Nome = $("#txtNome").val();
        var DataCadastro = new Date($("#txtDataAniversario").val() + "T12:00:00").toISOString();
        var Area = $("#ddlArea option:selected").text();
        var UrlFoto = $("#txtURLFoto").val();
        var Observacao = $("#txtObservacao").val();
        sp.web.lists.getByTitle("Cadastro").items.add({
            Title: Nome,
            DataCadastro: DataCadastro,
            Area: Area,
            UrlFoto: UrlFoto,
            Observacao: Observacao
        }).then(function (iar) {
            toastr["success"]("Cadastro realizado com sucesso!", "Sucesso");
        }, function (err) {
            console.log(err);
            toastr["error"]("Ocorreu um erro ao realizar o cadastro.", "Erro");
        });
    };
    Object.defineProperty(CadastroWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    CadastroWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return CadastroWebPart;
}(BaseClientSideWebPart));
export default CadastroWebPart;
//# sourceMappingURL=CadastroWebPart.js.map