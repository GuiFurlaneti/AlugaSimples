$(document).ready(function () {

    $("#msg-exibicao").hide();

    $(".ct-msg-exibicao-adm").hide();

    $(".ct-msg-retorno-agradescimento").hide();
    var idUser = '$User_Id';
    const $carouselImages = $('.carousel-images');
    const $slides = $carouselImages.find('.slide');
    const $dotsContainer = $('.carousel-dots');
    const slideCount = $slides.length;
    let index = 0;

    // Cria os dots dinamicamente
    for (let i = 0; i < slideCount; i++) {
        $dotsContainer.append('<div class="carousel-dot" data-index="' + i + '"></div>');
    }

    const $dots = $dotsContainer.find('.carousel-dot');
    $dots.eq(index).addClass('active'); // Marca o dot inicial como ativo

    function moveToNextSlide() {
        index = (index + 1) % slideCount;
        const offset = -index * 100;
        $carouselImages.css('transform', `translateX(${offset}%)`);
        updateDots();
    }

    function updateDots() {
        $dots.removeClass('active');
        $dots.eq(index).addClass('active');
    }

    function cliqueDot(clickedIndex) {
        index = clickedIndex;
        const offset = -index * 100;
        $carouselImages.css('transform', `translateX(${offset}%)`);
        updateDots();
    }

    setInterval(moveToNextSlide, 4000); // Muda de slide a cada 4 segundos

    // Adiciona o evento de clique aos dots
    $dots.on('click', function () {
        const clickedIndex = $(this).data('index');
        cliqueDot(clickedIndex);
    });

    var typeNameAdm = $('#typeNameAdm').val();
    if (typeNameAdm == "PaineldeReservas") {

        listarReservasPendentes();
        listarReservasAprovadas();
    }


    var anoYear = $('#valueYear').val();
    if (anoYear != "") {
        listarReservasAprovadasAgenda();
    }

});

function openMenuMobile() {
    $("#menu-mobile-id").css("display", "flex");
}

function closeMenuMobile() {
    $("#menu-mobile-id").css("display", "none");
}

function exibeFotos(pack) {

    $('#casamentos').css('display', 'none');
    $('#aniversarios').css('display', 'none');
    $('#festas').css('display', 'none');
    $('#eventos').css('display', 'none');
    $('#chaDeBebe').css('display', 'none');

    var packExibido = "#" + pack;

    $(packExibido).fadeIn(1000);
    $(packExibido).css('display', 'flex');


    $('#active-casamentos').css('font-weight', 'normal');
    $('#active-aniversarios').css('font-weight', 'normal');
    $('#active-festas').css('font-weight', 'normal');
    $('#active-eventos').css('font-weight', 'normal');
    $('#active-chaDeBebe').css('font-weight', 'normal');

    var active = "#active-" + pack;
    $(active).css('font-weight', 'bold');
}

function exibeFiltro() {
    $("#active-casamentos").css("display", "none");
    $("#active-aniversarios").css("display", "none");
    $("#active-festas").css("display", "none");

    $("#active-eventos").css("display", "flex");
    $("#active-chaDeBebe").css("display", "flex");

    $(".avance-filters").css("display", "none");
    $(".back-filters").css("display", "flex");
}

function ocultaFiltro() {
    $("#active-casamentos").css("display", "flex");
    $("#active-aniversarios").css("display", "flex");
    $("#active-festas").css("display", "flex");

    $("#active-eventos").css("display", "none");
    $("#active-chaDeBebe").css("display", "none");

    $(".avance-filters").css("display", "flex");
    $(".back-filters").css("display", "none");

}

function openModal(daySelect) {

    let hoje = new Date();
    let dataAtual = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;

    // Coleta a data inserida pelo usuário
    var dayVal = daySelect
    var monthVal = $('#valueMonth').val();
    var yearVal = $('#valueYear').val();

    if (dayVal < 10) {
        dayVal = "0" + dayVal;
    }

    const monthMap = {
        "Janeiro": "01",
        "Fevereiro": "02",
        "Março": "03",
        "Abril": "04",
        "Maio": "05",
        "Junho": "06",
        "Julho": "07",
        "Agosto": "08",
        "Setembro": "09",
        "Outubro": "10",
        "Novembro": "11",
        "Dezembro": "12"
    };

    monthVal = monthMap[monthVal];

    let dataUsuario = dayVal + "/" + monthVal + "/" + yearVal;

    let partesDataUsuario = dataUsuario.split('/');
    let diaUsuario = parseInt(partesDataUsuario[0]);
    let mesUsuario = parseInt(partesDataUsuario[1]) - 1; // Meses em JavaScript são indexados em 0
    let anoUsuario = parseInt(partesDataUsuario[2]);

    // Cria um objeto Date para a data do usuário
    let dataUsuarioObj = new Date(anoUsuario, mesUsuario, diaUsuario);

    if (dataUsuarioObj < hoje) {
        exibeMsgRetorno("Não é possivel reservar datas passadas.", "erro");
    } else if (dataUsuarioObj.toDateString() === hoje.toDateString()) {
        exibeMsgRetorno("Para reservar HOJE é necessario falar com o proprietario.", "sucesso");
    } else {
        //Permissão concedida 
        $('#modalReservar').focus();

        var day = daySelect
        var month = $('#valueMonth').val();
        var year = $('#valueYear').val();

        var daySelecReserv = "#" + daySelect;
        //
        $(daySelecReserv).toggleClass('daySelecReserv');

        if (day < 10) {
            day = "0" + day;
        }

        const monthMap = {
            "Janeiro": "01",
            "Fevereiro": "02",
            "Março": "03",
            "Abril": "04",
            "Maio": "05",
            "Junho": "06",
            "Julho": "07",
            "Agosto": "08",
            "Setembro": "09",
            "Outubro": "10",
            "Novembro": "11",
            "Dezembro": "12"
        };

        month = monthMap[month];


        $('#modalReservar').fadeIn('slow', function () {
            document.getElementById('modalReservar').scrollIntoView({ behavior: 'smooth' });
        });

        var diasSelecionados = [];
        $('div.daySelecReserv').each(function () {
            var daySelectMark = $(this).text();
            diasSelecionados.push(daySelectMark);
        });

        var dayAttEntrada = diasSelecionados[0];
        var dayAttSaida = diasSelecionados[diasSelecionados.length - 1];

        if (dayAttEntrada == "" || dayAttEntrada == null || dayAttEntrada == undefined) { dayAttEntrada = "??"; }
        if (dayAttSaida == "" || dayAttSaida == null || dayAttSaida == undefined) { dayAttSaida = "??"; }


        if (dayAttEntrada < 10 && dayAttEntrada != "") {
            dayAttEntrada = "0" + dayAttEntrada;
        }

        if (dayAttSaida < 10 && dayAttSaida != "") {
            dayAttSaida = "0" + dayAttSaida;
        }


        var dt_sai = dayAttEntrada + "/" + month + "/" + year;
        var dt_ent = dayAttSaida + "/" + month + "/" + year;

        function converterData(data) {
            const [dia, mes, ano] = data.split('/').map(Number);
            return `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
        }

        const dataEntradaFormatada = converterData(dt_sai);
        const dataSaidaFormatada = converterData(dt_ent);

        $('#entrada').val(dataEntradaFormatada);
        $('#saida').val(dataSaidaFormatada);

        for (c = dayAttEntrada; c != dayAttSaida; c++) {
            var somaDay = "#" + c;
            $(somaDay).addClass('daySelecReserv');
        }
    }


}

function exibeMsgRetorno(msg_exibicao, status) {

    $("#msg-exibicao").modal('hide');
    $('#msg-exibicao').html("");

    var svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">' +
        '<path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>' +
        '</svg>';

    $('#msg-exibicao').html(svgIcon + "&nbsp;" + msg_exibicao);

    if (status == "sucesso") {
        var msg_retorno = document.getElementById('msg-exibicao');
        msg_retorno.style.backgroundColor = '#225ec3';

        $('html, body').animate({
            scrollTop: $('#msg-exibicao').offset().top
        }, 1000);

        $("#msg-exibicao").fadeIn('slow');

        setTimeout(function () {
            $("#msg-exibicao").fadeOut('slow');
        }, 3500);

    } else {
        var msg_retorno = document.getElementById('msg-exibicao');
        msg_retorno.style.backgroundColor = '#931010';

        $('html, body').animate({
            scrollTop: $('#msg-exibicao').offset().top
        }, 1000);

        $("#msg-exibicao").fadeIn('slow');

        setTimeout(function () {
            $("#msg-exibicao").fadeOut('slow');
        }, 3500);
    }


}

function validaFormSolicitarReserva() {

    var nome = $('#name').val();
    var telefone = $('#tel').val();
    var pagamento = $('#pagamento').val();
    var entrada = $('#entrada').val();
    var saida = $('#saida').val();

    if (nome == "" || nome == null || nome == undefined) {
        exibeMsgRetorno("Preencha seu nome", "erro");
        return false;
    }

    if (telefone == "" || telefone == null || telefone == undefined) {
        exibeMsgRetorno("Digite seu telefone", "erro");
        return false;
    }

    if (pagamento == "" || pagamento == null || pagamento == undefined) {
        exibeMsgRetorno("Preencha sua opção de pagamento", "sucesso");
        return false;
    }

    if (entrada == "" || entrada == null || entrada == undefined) {
        exibeMsgRetorno("Escolha uma data", "sucesso");
        $('#entrada').focus();
        return false;
    }

    if (saida == "" || saida == null || saida == undefined) {
        exibeMsgRetorno("Escolha uma data de saida", "sucesso");
        $('#saida').focus();
        return false;
    }

    return true;
}

function solicitaReserva() {
    if (validaFormSolicitarReserva()) {
        incluirSolicitacaoDeReserva();
    }
}

function updateMinDate(input) {


    const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD
    const selectedDate = new Date(input.value);

    if (selectedDate < new Date(today)) {
        exibeMsgRetorno("Não é possivel reservar datas passadas.", "erro");
        input.value = ''; // Limpa o valor do input
    }

    var dt_ent = $('#entrada').val();
    var dt_sai = $('#saida').val();

    if (dt_ent && dt_sai) {

        var dataEntrada = new Date(dt_ent);
        var dataSaida = new Date(dt_sai);

        if (dataEntrada > dataSaida) {
            document.getElementById('entrada').value = '';
            document.getElementById('saida').value = '';
            exibeMsgRetorno("Data de saida invalida.", "erro");
        }
    }


}

function updateMinDateEdit(input) {
    const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD
    const selectedDate = new Date(input.value);

    if (selectedDate < new Date(today)) {
        exibeMsgRetornoAdm("Não é possivel selecionar uma data passada.");
        exibeMsgRetorno("Não é possivel selecionar uma data passada.");
        input.value = ''; // Limpa o valor do input
    }

    var dt_ent = $('#entrada').val();
    var dt_sai = $('#saida').val();

    if (dt_ent && dt_sai) {

        var dataEntrada = new Date(dt_ent);
        var dataSaida = new Date(dt_sai);

        if (dataEntrada > dataSaida) {
            document.getElementById('entrada').value = '';
            document.getElementById('saida').value = '';
            exibeMsgRetornoAdm("Data de saida invalida.");
            exibeMsgRetorno("Data de saida invalida.");
        }
    }
}

function checkServicesAdd() {
    // Obter o checkbox "Nenhum" e todos os outros checkboxes
    var nenhumCheckbox = document.getElementById('Nenhum');
    var otherCheckboxes = [
        document.getElementById('Equipamentos'),
        document.getElementById('Decoracao'),
        document.getElementById('Catering')
    ];

    // Se "Nenhum" estiver marcado, desmarque todos os outros checkboxes
    if (nenhumCheckbox.checked) {
        otherCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    }

    // Caso contrário, se qualquer um dos outros checkboxes estiver marcado, desmarque "Nenhum"
    else {
        var anyOtherChecked = otherCheckboxes.some(function (checkbox) {
            return checkbox.checked;
        });

        if (anyOtherChecked) {
            nenhumCheckbox.checked = false;
        }
    }
}


// CRUD //
function exibiLoading() {
    $('.client-reserva').css('display', 'none');
    $('.ct-loading').css('display', 'flex');
}
function ocultaLoading() {
    $('.ct-loading').css('display', 'none');
    $('.client-reserva').css('display', 'flex');
}

function exibiLoadingAprovados() {
    $('.client-reserva-aprovada').css('display', 'none');
    $('.ct-loading-aprovados').css('display', 'flex');
}
function ocultaLoadingAprovados() {
    $('.ct-loading-aprovados').css('display', 'none');
    $('.client-reserva-aprovada').css('display', 'flex');
}

function exibiLoadingCtFlexBlock() {
    $('.ct-flex-block').hide();
    $(".ct-loading-flex-block").show();
}
function ocultaLoadingCtFlexBlock() {
    $('.ct-loading-flex-block').hide();
    $('.ct-flex-block').show();
}


function validaLogin() {
    var userUSUARIO = $('#id_usuario').val().toUpperCase();
    var pswSENHA = $('#id_senha').val().toUpperCase();

    function contaLogin(lg, psw) {
        if (lg.length < 5) {
            exibeMsgRetorno("Usuario ou senha invalidos!");
            return false;
        }

        if (psw.length < 5) {
            exibeMsgRetorno("Usuario ou senha invalidos!");
            return false;
        }

        return true;
    }

    var ctLogin = contaLogin(userUSUARIO, pswSENHA)
    if (ctLogin) {
        $.ajax({
            url: '/Login/ValidarLoginAutenticado',
            type: 'POST',
            data: {
                user: userUSUARIO,
                psw: pswSENHA,
                _token: '{{ csrf_token() }}'
            },
            success: function (response) {
                if (response.success == true) {
                    login();
                } else {
                    exibeMsgRetorno("Usuario ou senha invalidos!");
                    $('#id_usuario').val("");
                    $('#id_senha').val("");
                    $('#id_usuario').focus();
                }

            },
            error: function (xhr, status, error) {
                exibeMsgRetorno("Usuario ou senha invalidos!");
                $('#id_usuario').val("");
                $('#id_senha').val("");
                $('#id_usuario').focus();
            }
        });
    }
}
function login() {
    // Cria um formulário HTML
    var form = document.createElement('form');
    form.method = 'POST'; // ou 'GET', dependendo do seu controlador
    form.action = '/Administrador/Index'; // URL da sua controladora

    // Adiciona um campo oculto, se necessário
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'validate';
    input.value = 'true';
    form.appendChild(input);

    // Adiciona o formulário ao corpo do documento
    document.body.appendChild(form);

    // Envia o formulário
    form.submit();
}
function exibiTelaEdit() {
    $('.aviso-edit-modal').css('display', 'none');
    $('.formEditReserva').css('display', 'block');
}


// PENDENTES
function listarReservasPendentes() {
    exibiLoading();
    $.ajax({
        url: '/Administrador/ListarReservasPendentes',
        type: 'POST',
        data: {},
        success: function (response) {
            var div = $('.ct-center-res-pendencias');
            div.empty();
            var reservas = response;
            if (reservas.length > 0) {
                for (var i = 0; i < reservas.length; i++) {

                    var reserva = reservas[i];

                    var Id = reserva.id;
                    var NOME = reserva.nome;
                    var TIPO_EVENTO = reserva.tipO_EVENTO;
                    var DIA_ENTRADA = reserva.diA_ENTRADA;
                    var DIA_SAIDA = reserva.diA_SAIDA;

                    var CONTATO = reserva.contato;
                    var PAGAMENTO = reserva.pagamento;
                    var SERVICOS_ADD = reserva.servicoS_ADD;

                    function converterData(data) {
                        var partes = data.split("-");
                        var ano = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var dataFormatada = dia + "/" + mes + "/" + ano;
                        return dataFormatada;
                    }

                    DIA_ENTRADA = converterData(DIA_ENTRADA);
                    DIA_SAIDA = converterData(DIA_SAIDA);


                    var reservaDiv = $('<div class="client-reserva">' +

                        '<div class="date-client">' +
                        '<label class="name-reserva-pen" id="nome-solicitacao_' + Id + '"><b>' + NOME + '</b></label>' +
                        '<label class="data-reserva-pen-ent" id="data-ent-solicitacao_' + Id + '">' + DIA_ENTRADA + '</label>' +
                        '<label class="data-reserva-pen-sai" id="data-sai-solicitacao_' + Id + '">' + DIA_SAIDA + '</label>' +
                        '<label class="evento-reserva-pen" id="eve-solicitacao_' + Id + '">' + TIPO_EVENTO + '</label>' +
                        '<input type="hidden" class="contato-solicitacao" id="contato-solicitacao_' + Id + '" value="' + CONTATO + '" />' +
                        '<input type="hidden" class="pagamento-solicitacao" id="pagamento-solicitacao_' + Id + '" value="' + PAGAMENTO + '" />' +
                        '<input type="hidden" class="servicosadd-solicitacao" id="servicosadd-solicitacao_' + Id + '" value="' + SERVICOS_ADD + '" />' +
                        '</div>' +

                        '<div class="client-button">' +
                        '<button type="button" class="btn btn-outline-dark" onclick="incluirReserva(' + Id + ')">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">' +
                        '<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />' +
                        '</svg>' +
                        '</button>' +
                        '<button type="button" class="btn btn-outline-dark" onclick="excluirSolicitacaoDeReserva(' + Id + ')">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">' +
                        '<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />' +
                        '</svg>' +
                        '</button>' +
                        '</div>' +

                        '</div>');

                    div.append(reservaDiv);
                } ocultaLoading();
            } else {
                exibeMsgRetornoAdm("Nenhuma solicitação encontrada", "sucesso");
                ocultaLoading();
            }
        },
        error: function (xhr, status, error) {

            console.error('Erro na requisição AJAX:', error);
        }
    });
}
function incluirSolicitacaoDeReserva() {

    var nome = $('#name').val();
    var telefone = $('#tel').val();
    var tipoEvento = $('#tipo-evento').val();
    var pagamento = $('#pagamento').val();
    var entrada = $('#entrada').val();
    var saida = $('#saida').val();

    var nenhum = "";
    var equipamentos = "";
    var decoracao = "";
    var catering = "";

    var equipamentoV = document.getElementById('Equipamentos');
    var decoracaoV = document.getElementById('Decoracao');
    var cateringV = document.getElementById('Catering');

    if (!equipamentoV.checked && !decoracaoV.checked && !cateringV.checked) {
        document.getElementById('Nenhum').checked = true;
    } else {
        document.getElementById('Nenhum').checked = false;
    }

    var checkboxnNenhum = document.getElementById('Nenhum');
    if (checkboxnNenhum.checked) { nenhum = $('#Nenhum').val(); }

    var checkboxnEquipamentos = document.getElementById('Equipamentos');
    if (checkboxnEquipamentos.checked) { equipamentos = $('#Equipamentos').val(); }

    var checkboxnDecoracao = document.getElementById('Decoracao');
    if (checkboxnDecoracao.checked) { decoracao = $('#Decoracao').val(); }

    var checkboxnCatering = document.getElementById('Catering');
    if (checkboxnCatering.checked) { catering = $('#Catering').val(); }

    var servicos = nenhum + " " + equipamentos + " " + decoracao + " " + catering;

    $.ajax({
        url: '/Agenda/IncluirSolicitacao',
        type: 'POST',
        data: {
            NOME: nome,
            CONTATO: telefone,
            TIPO_EVENTO: tipoEvento,
            PAGAMENTO: pagamento,
            SERVICOS_ADD: servicos,
            DIA_ENTRADA: entrada,
            DIA_SAIDA: saida,
            _token: '{{ csrf_token() }}'
        },
        success: function (response) {
            $('#name').val("");
            $('#tel').val("");
            $('#pagamento').val("");
            $('#entrada').val("");
            $('#saida').val("");
            $(".ct").hide();
            $(".ct-msg-retorno-agradescimento").fadeIn();
            exibeMsgRetornoAdm("Solicitação enviada com sucesso", "sucesso");
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}
function excluirSolicitacaoDeReserva(excluir_id) {
    var id = excluir_id;

    if (confirm("Confirmar exclusão?")) {
        $.ajax({
            url: '/Administrador/ExcluirSolicitacaoDeReserva',
            type: 'POST',
            data: { Id: id, },
            success: function (response) {
                console.error('Solicitação excluida com sucesso!');
                listarReservasPendentes();
                exibeMsgRetornoAdm("Solicitação excluida com sucesso!", "sucesso")
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}
function deletarSolicitacaoDeReserva(excluir_id) {
    var id = excluir_id;
    $.ajax({
        url: '/Administrador/ExcluirSolicitacaoDeReserva',
        type: 'POST',
        data: { Id: id, },
        success: function (response) {
            console.error('Solicitação excluida com sucesso!');
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });

}
function voltarReservaPendente(id) {

    var userId = id;
    var nome = $('#nome-reserva_' + id).text();
    var telefone = $('#contato-reserva_' + id).val();
    var tipoEvento = $('#eve-reserva_' + id).text();
    var pagamento = $('#pagamento-reserva_' + id).val();
    var entrada = $('#data-ent-reserva_' + id).text();
    var saida = $('#data-sai-reserva_' + id).text();
    var servicos = $('#servicosadd-reserva_' + id).val();

    function converterData(data) {
        var partes = data.split("/");
        var dia = partes[0];
        var mes = partes[1];
        var ano = partes[2];

        var dataFormatada = ano + "-" + mes + "-" + dia;
        return dataFormatada;
    }

    entrada = converterData(entrada);
    saida = converterData(saida);

    if (confirm("Deseja reverter essa solicitação?")) {
        $.ajax({
            url: '/Agenda/IncluirSolicitacao',
            type: 'POST',
            data: {
                NOME: nome,
                CONTATO: telefone,
                TIPO_EVENTO: tipoEvento,
                PAGAMENTO: pagamento,
                SERVICOS_ADD: servicos,
                DIA_ENTRADA: entrada,
                DIA_SAIDA: saida,
                _token: '{{ csrf_token() }}'
            },
            success: function (response) {
                deletarReserva(userId);
                listarReservasAprovadas();
                listarReservasPendentes();
                exibeMsgRetornoAdm("Reserva convertida com suesso!", "sucesso")
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}


// APROVADAS
function exibeMsgRetornoAdm(msg_exibicao, status) {

    var svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">' +
        '<path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>' +
        '</svg>';

    $('#msg-text-adm').html(svgIcon + "&nbsp;" + msg_exibicao);

    if (status == "sucesso") {
        var msg_retorno = document.getElementById('msg-exibicao-adm');
        msg_retorno.style.backgroundColor = '#225ec3';

        $('html, body').animate({
            scrollTop: $('.ct-msg-exibicao-adm').offset().top
        }, 1000);


        $(".ct-msg-exibicao-adm").fadeIn('slow');

        setTimeout(function () {
            $(".ct-msg-exibicao-adm").fadeOut('slow');
        }, 3500);


    } else {
        var msg_retorno = document.getElementById('msg-exibicao-adm');
        msg_retorno.style.backgroundColor = '#931010';

        $('html, body').animate({
            scrollTop: $('.ct-msg-exibicao-adm').offset().top
        }, 1000);

        $(".ct-msg-exibicao-adm").fadeIn('slow');

        setTimeout(function () {
            $(".ct-msg-exibicao-adm").fadeOut('slow');
        }, 3500);
    }


}
function incluirReserva(id) {

    var userId = id;
    var nome = $('#nome-solicitacao_' + id).text();
    var telefone = $('#contato-solicitacao_' + id).val();
    var tipoEvento = $('#eve-solicitacao_' + id).text();
    var pagamento = $('#pagamento-solicitacao_' + id).val();
    var entrada = $('#data-ent-solicitacao_' + id).text();
    var saida = $('#data-sai-solicitacao_' + id).text();
    var servicos = $('#servicosadd-solicitacao_' + id).val();

    function converterData(data) {
        var partes = data.split("/");
        var dia = partes[0];
        var mes = partes[1];
        var ano = partes[2];

        var dataFormatada = ano + "-" + mes + "-" + dia;
        return dataFormatada;
    }

    entrada = converterData(entrada);
    saida = converterData(saida);

    if (confirm("Deseja aprovar essa solicitação?")) {
        $.ajax({
            url: '/Administrador/IncluirReserva',
            type: 'POST',
            data: {
                NOME: nome,
                CONTATO: telefone,
                TIPO_EVENTO: tipoEvento,
                PAGAMENTO: pagamento,
                SERVICOS_ADD: servicos,
                DIA_ENTRADA: entrada,
                DIA_SAIDA: saida,
                _token: '{{ csrf_token() }}'
            },
            success: function (response) {
                deletarSolicitacaoDeReserva(userId);
                listarReservasAprovadas();
                listarReservasPendentes();
                exibeMsgRetornoAdm("Solicitação aprovada!", "sucesso")
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}
function listarReservasAprovadas() {
    exibiLoadingAprovados();
    $.ajax({
        url: '/Administrador/ListarReservasAprovadas',
        type: 'POST',
        data: {},
        success: function (response) {
            var div = $('.ct-center-res-aprovadas');
            div.empty();
            var reservas = response;
            if (reservas.length > 0) {
                for (var i = 0; i < reservas.length; i++) {

                    var reserva = reservas[i];

                    var Id = reserva.id;
                    var NOME = reserva.nome;
                    var TIPO_EVENTO = reserva.tipO_EVENTO;
                    var DIA_ENTRADA = reserva.diA_ENTRADA;
                    var DIA_SAIDA = reserva.diA_SAIDA;

                    var CONTATO = reserva.contato;
                    var PAGAMENTO = reserva.pagamento;
                    var SERVICOS_ADD = reserva.servicoS_ADD;

                    function converterData(data) {
                        var partes = data.split("-");
                        var ano = partes[0];
                        var mes = partes[1];
                        var dia = partes[2];

                        var dataFormatada = dia + "/" + mes + "/" + ano;
                        return dataFormatada;
                    }

                    DIA_ENTRADA = converterData(DIA_ENTRADA);
                    DIA_SAIDA = converterData(DIA_SAIDA);


                    var reservaDiv = $('<div class="client-reserva-concluida">' +

                        '<div class="date-client">' +
                        '<label class="name-reserva-pen" id="nome-reserva_' + Id + '"><b>' + NOME + '</b></label>' +
                        '<label class="data-reserva-pen-ent" id="data-ent-reserva_' + Id + '">' + DIA_ENTRADA + '</label>' +
                        '<label class="data-reserva-pen-sai" id="data-sai-reserva_' + Id + '">' + DIA_SAIDA + '</label>' +
                        '<label class="evento-reserva-pen" id="eve-reserva_' + Id + '">' + TIPO_EVENTO + '</label>' +
                        '<input type="hidden" class="contato-solicitacao" id="contato-reserva_' + Id + '" value="' + CONTATO + '" />' +
                        '<input type="hidden" class="pagamento-solicitacao" id="pagamento-reserva_' + Id + '" value="' + PAGAMENTO + '" />' +
                        '<input type="hidden" class="servicosadd-solicitacao" id="servicosadd-reserva_' + Id + '" value="' + SERVICOS_ADD + '" />' +
                        '</div>' +
                        '<div class="client-button">' +
                        '<button type="button" class="btn btn-outline-dark" onclick="voltarReservaPendente(' + Id + ')">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">'+
                        '<path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>'+
                        '</svg> ' +
                        '<div class="client-button">' +
                        '<button type="button" class="btn btn-outline-dark" onclick="editarReserva(' + Id + ')">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
                        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />' +
                        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />' +
                        '</svg > ' +
                        '</button>' +
                        '<button type="button" class="btn btn-outline-dark" onclick="excluirReserva(' + Id + ')">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">' +
                        '<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />' +
                        '</svg>' +
                        '</button>' +
                        '</div>' +

                        '</div>');

                    div.append(reservaDiv);
                } ocultaLoadingAprovados();
            } else {
                exibeMsgRetornoAdm("Nenhuma reserva encontrada", "sucesso");
                ocultaLoadingAprovados();
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}
function editarReserva(alterar_id) {
    var id = alterar_id;
    $.ajax({
        url: '/Administrador/BuscarEditarAprovados',
        type: 'POST',
        data: { Id: id, },
        success: function (response) {
            exibiTelaEdit();

            var reserva = response

            var Id = reserva.id;
            var NOME = reserva.nome;
            var TIPO_EVENTO = reserva.tipO_EVENTO;
            var DIA_ENTRADA = reserva.diA_ENTRADA;
            var DIA_SAIDA = reserva.diA_SAIDA;
            var CONTATO = reserva.contato;
            var PAGAMENTO = reserva.pagamento;
            var SERVICOS_ADD = reserva.servicoS_ADD;

            var equipamentos = false;
            var decoracao = false;
            var catering = false;
            var nenhum = false;

            if (SERVICOS_ADD.includes('Equipamentos')) { equipamentos = true; }
            if (SERVICOS_ADD.includes('Decoração')) { decoracao = true; }
            if (SERVICOS_ADD.includes('Catering')) { catering = true; }
            if (SERVICOS_ADD.includes('Nenhum')) { nenhum = true; }


            if (nenhum == true) {
                document.getElementById('Nenhum').checked = true;
                document.getElementById('Equipamentos').checked = false;
                document.getElementById('Decoracao').checked = false;
                document.getElementById('Catering').checked = false;
            } else {
                document.getElementById('Nenhum').checked = false;
            }

            if (equipamentos == true) { document.getElementById('Equipamentos').checked = true; }
            if (decoracao == true) { document.getElementById('Decoracao').checked = true; }
            if (catering == true) { document.getElementById('Catering').checked = true; }



            $('#idUsuario').val(Id);
            $('#name').val(NOME);
            $('#tel').val(CONTATO);
            $('#tipo-evento').val(TIPO_EVENTO);
            $('#pagamento').val(PAGAMENTO);
            $('#entrada').val(DIA_ENTRADA);
            $('#saida').val(DIA_SAIDA);


            $('.ct-modal-edicao').show();

        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}
function alterarReserva() {
    if (validarEdit()) {
        var id = $('#idUsuario').val();
        var nome = $('#name').val();
        var tipo_evento = $('#tipo-evento').val();
        var dia_entrada = $('#entrada').val();
        var dia_saida = $('#saida').val();
        var contato = $('#tel').val();
        var pagamento = $('#pagamento').val();
        var servicos = "";

        var nenhum = "";
        var equipamentos = "";
        var decoracao = "";
        var catering = "";

        var checkboxnNenhum = document.getElementById('Nenhum');
        if (checkboxnNenhum.checked) { nenhum = $('#Nenhum').val(); }

        var checkboxnEquipamentos = document.getElementById('Equipamentos');
        if (checkboxnEquipamentos.checked) { equipamentos = $('#Equipamentos').val(); }

        var checkboxnDecoracao = document.getElementById('Decoracao');
        if (checkboxnDecoracao.checked) { decoracao = $('#Decoracao').val(); }

        var checkboxnCatering = document.getElementById('Catering');
        if (checkboxnCatering.checked) { catering = $('#Catering').val(); }

        var servicos = nenhum + " " + equipamentos + " " + decoracao + " " + catering;
        $.ajax({
            url: '/Administrador/AlterarReserva',
            type: 'POST',
            data: {
                Id: id,
                NOME: nome,
                CONTATO: contato,
                TIPO_EVENTO: tipo_evento,
                PAGAMENTO: pagamento,
                SERVICOS_ADD: servicos,
                DIA_ENTRADA: dia_entrada,
                DIA_SAIDA: dia_saida,
            },
            success: function (response) {
                listarReservasAprovadas();
                exibeMsgRetornoAdm("Alterações salvas com sucesso", "sucesso");

            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}
function excluirReserva(excluir_id_reserva) {
    var id = excluir_id_reserva;

    if (confirm("Confirmar exclusão?")) {
        $.ajax({
            url: '/Administrador/ExcluirReserva',
            type: 'POST',
            data: { Id: id, },
            success: function (response) {
                console.log('Solicitação excluida com sucesso!');
                listarReservasAprovadas();
                exibeMsgRetornoAdm("Solicitação excluida com sucesso!", "sucesso");
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}
function deletarReserva(excluir_id_reserva) {
    var id = excluir_id_reserva;
    $.ajax({
        url: '/Administrador/ExcluirReserva',
        type: 'POST',
        data: { Id: id, },
        success: function (response) {
            listarReservasAprovadas();
            exibeMsgRetornoAdm("Solicitação revertida com sucesso!", "sucesso");
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}
function descartarAlteracoes() {
    var id = $('#idUsuario').val();
    editarReserva(id);
}
function validarEdit() {
    var nome = $('#name').val();
    var entrada = $('#entrada').val();
    var saida = $('#saida').val();
    var telefone = $('#tel').val();
    var pagamento = $('#pagamento').val();

    var equipamento = document.getElementById('Equipamentos');
    var decoracao = document.getElementById('Decoracao');
    var catering = document.getElementById('Catering');

    if (!equipamento.checked && !decoracao.checked && !catering.checked) {
        document.getElementById('Nenhum').checked = true;
    } else {
        document.getElementById('Nenhum').checked = false;
    }

    if (nome == "" || nome == null || nome == undefined) {
        exibeMsgRetornoAdm("Preencha seu nome", "erro");
        return false;
    }

    if (telefone == "" || telefone == null || telefone == undefined) {
        exibeMsgRetornoAdm("Digite seu telefone", "erro");
        return false;
    }

    if (pagamento == "" || pagamento == null || pagamento == undefined) {
        exibeMsgRetornoAdm("Preencha sua opção de pagamento", "erro");
        return false;
    }

    if (entrada == "" || entrada == null || entrada == undefined) {
        exibeMsgRetornoAdm("Escolha uma data", "erro");
        $('#entrada').focus();
        return false;
    }

    if (saida == "" || saida == null || saida == undefined) {
        exibeMsgRetornoAdm("Escolha uma data de saida", "erro");
        $('#saida').focus();
        return false;
    }

    return true;

}
function fecharModalEditar() {
    $('.ct-modal-edicao').hide();
}


// EXIBIR DIAS AGENDA
function listarReservasAprovadasAgenda() {
    exibiLoadingCtFlexBlock();
    $.ajax({
        url: '/Administrador/ListarReservasAprovadas',
        type: 'POST',
        data: {},
        success: function (response) {

            var reservas = response;
            if (reservas.length > 0) {
                for (var i = 0; i < reservas.length; i++) {


                    var mesExibido = $('#valueMonth').val();
                    var anoExibido = $('#valueYear').val();

                    const monthMap = {
                        "Janeiro": "01",
                        "Fevereiro": "02",
                        "Março": "03",
                        "Abril": "04",
                        "Maio": "05",
                        "Junho": "06",
                        "Julho": "07",
                        "Agosto": "08",
                        "Setembro": "09",
                        "Outubro": "10",
                        "Novembro": "11",
                        "Dezembro": "12"
                    };
                    mesExibido = monthMap[mesExibido];

                    var reserva = reservas[i];
                    var DIA_ENTRADA = reserva.diA_ENTRADA;
                    var DIA_SAIDA = reserva.diA_SAIDA;

                    var partesEnt = DIA_ENTRADA.split("-");
                    var anoReservaEnt = partesEnt[0];
                    var mesReservaEnt = partesEnt[1];
                    var diaReservaEnt = partesEnt[2];

                    var partesSai = DIA_SAIDA.split("-");
                    var anoReservaSai = partesSai[0];
                    var mesReservaSai = partesSai[1];
                    var diaReservaSai = partesSai[2];



                    if (diaReservaEnt < 10) {
                        diaReservaEnt = diaReservaEnt.replace('0', '')
                    }

                    if (diaReservaSai < 10) {
                        diaReservaSai = diaReservaSai.replace('0', '')
                    }


                    if (anoExibido == anoReservaEnt) {
                        if (mesExibido == mesReservaEnt) {
                            bloqueiaDay(diaReservaEnt);
                            bloqueiaDay(diaReservaSai);
                            for (c = diaReservaEnt; c < diaReservaSai; c++) {
                                bloqueiaDay(c);
                            }
                        } else {
                            if (mesExibido == mesReservaSai) {
                                bloqueiaDay(diaReservaSai);
                                for (c = 1; c != diaReservaSai; c++) {
                                    bloqueiaDay(c);
                                }
                            }
                        }
                    }

                } ocultaLoadingCtFlexBlock();
            } else {
                ocultaLoadingCtFlexBlock();
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}
function bloqueiaDay(idDay) {
    var div = document.getElementById(idDay);
    div.classList.add('blockDay');
    div.onclick = exibeMsgDeBloqueio;
}
function exibeMsgDeBloqueio() {
    exibeMsgRetorno("Dia indisponivel");
}