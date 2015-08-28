/**
* @author Alexandre bagio
* @description: controller angularjs for fidelidades
*/
function getAjax(a,o,s){var e=[];return $.ajax({type:a,cache:!1,async:!1,global:!1,datatype:"html",url:o,data:s,success:function(a){e=JSON.parse($.trim(a))},statusCode:{404:function(){alert("Pagina nao encontrada"),window.close()},500:function(){alert("Erro: tente novamente."),window.close()}}}),e}var app=angular.module("descontoFidelidade",["ngMessages"]);app.controller("fidelidadeCtrl",["$scope","$http","$sce",function(a,o,s){switch(a.objPessoa={passo:""},a.iniciar_solicitacao=!0,a.pagina="",a.duvidas=!1,a.frameName="",a.frameUrl="",a.isCheckSolicitacao=getAjax("GET",APPATH+"fidelidades/isCheckSolicitacaoAjax"),a.isCheckSolicitacao.comecou&&(a.iniciar_solicitacao=!1,a.objPessoa=getAjax("GET",APPATH+"fidelidades/getPessoaAjax"),a.frameName="Edital",a.frameUrl=s.trustAsResourceUrl(APPATH+"../../diario/arquivos/desconto/desconto_fidelidade.pdf"),a.dataAceiteEdital=getAjax("GET",APPATH+"fidelidades/getDataAceiteAjax?i_solicitacao="+a.objPessoa.i_solicitacao)),a.iniciaSolicitacao=function(){a.iniciar_solicitacao=!1,a.pagina="edital",a.etapas_concluidas=0,a.objPessoa=getAjax("GET",APPATH+"fidelidades/getPessoaAjax"),a.frameName="Edital",a.frameUrl=s.trustAsResourceUrl(APPATH+"../../diario/arquivos/desconto/desconto_fidelidade.pdf"),a.dataAceiteEdital=getAjax("GET",APPATH+"fidelidades/getDataAceiteAjax?i_solicitacao="+a.objPessoa.i_solicitacao)},a.classe_resultado="","D"==a.objPessoa.passo?a.classe_resultado="deferido":"I"==a.objPessoa.passo?a.classe_resultado="indeferido":"F"==a.objPessoa.passo&&(a.classe_resultado="analise"),a.objPessoa.passo){case"E":a.etapas_concluidas=1,a.pagina="cursos";break;case"C":a.etapas_concluidas=2,a.pagina="concluir";break;case"F":case"D":case"I":a.etapas_concluidas=3,a.pagina="resultados";break;default:a.iniciar_solicitacao||(a.etapas_concluidas=0,a.pagina="edital")}a.setAceite=function(o){a.dataAceiteEdital=getAjax("GET",APPATH+"fidelidades/setAceiteAjax?i_solicitacao="+o),"S"==a.dataAceiteEdital.edital&&(a.objPessoa.passo="E",a.etapas_concluidas=1,a.getCursos(o,a.objPessoa.i_pessoa))},a.objCursosTecnico=[],a.objCursosSuperior=[],a.contatoSuperior=!1,a.contatoTecnico=!1,a.getCursos=function(o,s){a.objCursosTecnico=getAjax("GET",APPATH+"fidelidades/getCursosTecnicoAjax?i_solicitacao="+o+"&i_pessoa="+s),a.objCursosSuperior=getAjax("GET",APPATH+"fidelidades/getCursosSuperiorAjax?i_solicitacao="+o+"&i_pessoa="+s),a.pagina="cursos",a.ContatoTec={email:a.objPessoa.email},a.ContatoSup={email:a.objPessoa.email}},a.setCursos=function(){var o=getAjax("GET",APPATH+"fidelidades/setCursosAjax?i_solicitacao="+a.objPessoa.i_solicitacao+"&i_pessoa="+a.objPessoa.i_pessoa);"C"==o.passo&&(a.objPessoa.passo="C",a.etapas_concluidas=2,a.getCursosConcluir(a.objPessoa.i_solicitacao,a.objPessoa.i_pessoa))},"cursos"==a.pagina&&a.getCursos(a.objPessoa.i_solicitacao,a.objPessoa.i_pessoa),a.setContato=function(o,s){var e={email:o.email,mensagem:o.mensagem,cpf:a.objPessoa.cpf,matricula:a.objPessoa.matricula,nome:a.objPessoa.aluno},i=getAjax("POST",APPATH+"fidelidades/setContatoAjax?tipo="+s,e);1==i.send&&(alert("Contato enviado com sucesso, em breve entraremos em contato!"),a.contatoTecnico=!1,a.contatoSuperior=!1)},a.objCursosTecnicoConc=[],a.objCursosSuperiorConc=[],a.getCursosConcluir=function(o,s){a.objCursosTecnicoConc=getAjax("GET",APPATH+"fidelidades/getCursosTecnicoAjax?i_solicitacao="+o+"&i_pessoa="+s),a.objCursosSuperiorConc=getAjax("GET",APPATH+"fidelidades/getCursosSuperiorAjax?i_solicitacao="+o+"&i_pessoa="+s),a.pagina="concluir"},a.setConcluir=function(o){var s=getAjax("GET",APPATH+"fidelidades/setConcluirAjax?i_solicitacao="+o);"F"==s.passo&&(a.objPessoa.passo="F",a.etapas_concluidas=3,a.getResultados(o))},"concluir"==a.pagina&&a.getCursosConcluir(a.objPessoa.i_solicitacao,a.objPessoa.i_pessoa),a.objResultado=[],a.getResultados=function(o){a.objResultado=getAjax("GET",APPATH+"fidelidades/getResultadoAjax?i_solicitacao="+o),a.pagina="resultados"},"resultados"==a.pagina&&a.getResultados(a.objPessoa.i_solicitacao)}]);