var currentTab = "default";

$(document).ready(function() {
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        if (currentTab == "default") {
            $("#defaultAttemptsTable tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        } else {
            $("#customAttemptsTable tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#levelSelect").empty();

    $.ajax({
        url: '/get_levels',
        type: 'POST',
        data: {
            level_type: currentTab
        },
        success: function(data) {
            data = data.levels
            $("#levelSelect").append("<option value='0'>All Levels</option>");
            data.forEach((element) => {
                $("#levelSelect").append("<option value='" + element[1] + "'>" + element[0] + "</option>");
            });
        }
    });
});;

$(".nav-tabs .nav-link").click(function() {
    currentTab = $(this).text();
    currentTab = currentTab[0].toLowerCase() + currentTab.slice(1);

    $("#levelSelect").empty();

    $.ajax({
        url: '/get_levels',
        type: 'POST',
        data: {
            "level_type": currentTab
        },
        success: function(data) {
            data = data.levels
            $("#levelSelect").append("<option value='0'>All Levels</option>");
            data.forEach((element) => {
                $("#levelSelect").append("<option value='" + element[1] + "'>" + element[0] + "</option>");
            });
        }
    });
});

$('#levelSelect').on('change', function() {
    var level_id = this.value;

    getAttemptHistory(level_id);
});

function checkLevelStatus(level_status) {
    var iconHTML;
    if (level_status == "passed") {
        iconHTML = "<i class='feather mr-2 icon-check f-24'></i>"
    } else {
        iconHTML = "<i class='feather mr-2 icon-x f-24'></i>"
    }
    return iconHTML
}

function getAttemptHistory(level_id) {
    $.ajax({
        url: '/attempt_history',
        type: 'POST',
        data: {
            "level_id": level_id,
            "level_type": currentTab
        },
        success: function(data) {
            data = data.attempts;

            var tableId = "#" + currentTab + "AttemptsTable"
            $(tableId).empty()

            data.forEach((element) => {
                var tableRowHTML =
                    "<tr> \
                        <td>" + element[0] + "</td> \
                        <td>" + element[6] + "</td> \
                        <td>" + checkLevelStatus(element[4]) + "</td> \
                        <td>" + element[1] + " pts</td> \
                        <td>" + element[2] + "</td> \
                        <td>" + element[5].substr(4, 12); + "</td> \
                    </tr>"

                $(tableId).append(tableRowHTML)
            });
        }
    });
}