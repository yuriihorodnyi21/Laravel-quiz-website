/*
* ************ Fit Quiz size ********************
* */

var w = window.innerWidth;
var h = window.innerHeight;

const elementHeight = 500;

zoomScale = (h - 30 - 42) / elementHeight;

// setZoom(zoomScale, document.getElementsByClassName('quiz_list_container')[0]);

function setZoom(zoom, el) {

    transformOrigin = [0, 0];
    el = el || instance.getContainer();
    var p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;

}

/*
* For Sequence UI
* */

$('#sortable').sortable();

/*
* ************ For Matching UI ***********
* */

$(function () {
    $(".draggable").draggable({

        start: function () {
            $(this).addClass("ui-state-highlight");
            if ($(this).attr("isdropped")) {
                $(this).parent().css({'justify-content': 'space-around'});
                $(this).attr("isdropped", false);
            }
        },

        stop: function () {
            $(this).removeClass("ui-state-highlight");

        },

        revert: true,
    });
    $(".droppable").droppable({
        classes: {
            "ui-droppable-hover": "ui-state-highlight"
        },
        drop: function (event, ui) {
            $(this).addClass("ui-state-hover");
            $(this).parent().css({'justify-content': 'center'});
            ui.draggable.attr("isdropped", true);

            swap_value(ui.draggable, $(this).next());
        }
    });
});

/*
* ************ For Drag the Words UI ***********
* */
var drag_words_array = [];
$("#slide_drag_words_answer span").draggable({

    start: function () {
        $(this).addClass("ui-state-highlight");
        // if ($(this).attr("isdropped")) {
        // $(this).parent().css({'justify-content': 'space-around'});
        // $(this).attr("isdropped", false);
        // }
    },

    stop: function () {
        $(this).removeClass("ui-state-highlight");

    },

    // revert: true,
});
$("#slide_drag_words_question .blank").droppable({
    classes: {
        "ui-droppable-hover": "ui-state-highlight"
    },
    drop: function (event, ui) {
        console.log('dropped');
        drag_words_array[$(this).index('.blank')] = ui.draggable.html();
        // $(this).parent().css({'justify-content': 'center'});
        // ui.draggable.attr("isdropped", true);

        // swap_value(ui.draggable, $(this).next());
    }
});

function swap_value(a, b) {
    tmp = a.html();
    a.html(b.html());
    b.html(tmp);
}

/*
* ************** Rearrange Preview UI *************
* */

let total_score = 0;
let correct_quiz_count = 0;

rearrange_preview_ui();

function rearrange_preview_ui() {
    switch ($('#type_id').html()) {
        case '6':
            var sequence_items = $('#sortable li');
            shuffle(sequence_items)

            var rearrange_sequence_sortable = '';
            for (let i = 0; i < sequence_items.length; i++) {
                rearrange_sequence_sortable += sequence_items[i].outerHTML;
            }

            $('#sortable').html(rearrange_sequence_sortable);
            break;

        case '7':
            var matching_content_items = $('.ui-widget-content');
            shuffle(matching_content_items);

            var rearrange_matching = [];
            for (let i = 0; i < matching_content_items.length; i++) {
                rearrange_matching.push($(matching_content_items[i]).html());
            }
            for (let i = 0; i < matching_content_items.length; i++) {
                $('.ui-widget-content').eq(i).html(rearrange_matching[i]);
            }
            break;
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
* ********** question Processing **************
* */

function preview() {
    let attempts = 1;
    switch ($('.preview_btn button').html()) {
        case 'Submit':
            if (evulate()) {
                total_score += parseInt($('#correct_score').html());
                correct_quiz_count += 1;
                $.toast({
                    title: 'Correct',
                    content: $('#feedback_correct').html(),
                    type: 'success',
                    delay: 3000,
                    dismissible: true,
                });
                $('.preview_btn button').html('Continue');
            } else {
                attempts += 1;
                incorrect_process();
            }
            break;
    }
    // $.toast({
    //     title: 'Incorrect',
    //     content: $('#feedback_incorrect').html(),
    //     type: 'error',
    //     delay: 3000,
    //     dismissible: true,
    // });
}

function evulate() {
    switch ($('#type_id').html()) {
        case '1':
            return $('input[name=answer]:checked').val() == $('#correct_answer').html();
            break;

        case '2':
            var selected_checkbox = $("input[name='answer']:checked");
            var response_answer = '';
            for (const selectedElement of selected_checkbox) {
                response_answer += $(selectedElement).val() + ';';
            }
            return response_answer == $('#correct_answer').html();
            break;

        case '3':
            return $('input[name=answer]:checked').val() == $('#correct_answer').html();
            break;

        case '4':
            return $('#answer').val() == $('#correct_answer').html();
            break;

        case '5':
            const numeric_answer = parseInt($('#answer').val());
            var correct_answer = $('#correct_answer').html();
            var numeric_answer_array = correct_answer.split('@');
            numeric_answer_array.pop();

            for (let numeric_item of numeric_answer_array) {
                numeric_item = numeric_item.replace("&lt;", "<").replace("&lt;", "<").replace("&gt;", ">");
                var symbol = numeric_item.split(';')[0];
                switch (symbol) {
                    case '==':
                        if (numeric_answer == parseInt(numeric_item.split(';')[1])) return true;
                        break;

                    case '<<':
                        if (numeric_answer > parseInt(numeric_item.split(';')[1]) && numeric_answer < parseInt(numeric_item.split(';')[2])) return true;
                        break;

                    case '>':
                        if (numeric_answer > parseInt(numeric_item.split(';')[1])) return true;
                        break;

                    case '>=':
                        if (numeric_answer >= parseInt(numeric_item.split(';')[1])) return true;
                        break;

                    case '<':
                        if (numeric_answer < parseInt(numeric_item.split(';')[1])) return true;
                        break;

                    case '<=':
                        if (numeric_answer <= parseInt(numeric_item.split(';')[1])) return true;
                        break;

                    case '!=':
                        if (numeric_answer != parseInt(numeric_item.split(';')[1])) return true;
                        break;
                }
            }

            return false;
            break;

        case '6':
            var sequence_answer = '';
            var sequence_items = $('#sortable li');

            for (let i = 0; i < sequence_items.length; i++) {
                sequence_answer += sequence_items.eq(i).find('label').html() + ';';
            }

            return sequence_answer == $('#correct_answer').html();
            break;

        case '7':
            const matching_items = $('.slide_view_answer_element .col-md-12 > div');
            let matching_answer = '';
            // detect matching
            for (let i = 0; i < matching_items.length; i++) {
                if (matching_items.eq(i).css('justify-content') != 'center') return false;
                matching_answer += matching_items.eq(i).find('p').eq(0).html() + ';' + matching_items.eq(i).find('p').eq(1).html() + '@';
            }

            return matching_answer == $('#correct_answer').html();
            break;

        case '8':
            var correct_answer = $('#correct_answer').html();
            var correct_answer_array = correct_answer.split('@');
            correct_answer_array.pop();

            let answer_array_items;
            for (let i = 0; i < correct_answer_array.length; i++) {
                answer_array_items = correct_answer_array[i].split(';');
                answer_array_items.pop();
                if (answer_array_items.indexOf($('.slide_view_answer_element input').eq(i).val()) == -1) return false;
            }

            return true;
            break;

        case '9':
            const select_lists_items = $('.slide_view_answer_element select');
            let select_lists_answer = '';

            for (let i = 0; i < select_lists_items.length; i++) {
                select_lists_answer += select_lists_items.eq(i).val() + ';';
            }

            return select_lists_answer == $('#correct_answer').html();
            break;

        case '10':
            let drag_words_answer = '';

            for (let i = 0; i < drag_words_array.length; i++) {
                drag_words_answer += drag_words_array[i] + ';';
            }

            return drag_words_answer == $('#correct_answer').html();
            break;
    }
}

function incorrect_process() {
    console.log('incorrect_process function');
}
