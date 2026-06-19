function loadExams() {
    $.ajax({
        url: 'data/data.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            renderExams(data);
        },
        error: function() {
            $('#examList').html(
                '<div class="col-12"><div class="empty-state">' +
                '<i class="bi bi-emoji-frown"></i>' +
                '<h5>Không thể tải danh sách bài kiểm tra</h5>' +
                '<p>Vui lòng thử lại sau.</p>' +
                '</div></div>'
            );
        }
    });
}

function renderExams(exams) {
    if (!exams || exams.length === 0) {
        $('#examList').html(
            '<div class="col-12"><div class="empty-state">' +
            '<i class="bi bi-inbox"></i>' +
            '<h5>Chưa có bài kiểm tra nào</h5>' +
            '<p>Hãy quay lại sau nhé!</p>' +
            '</div></div>'
        );
        return;
    }

    let html = '';
    const icons = ['bi-calculator', 'bi-droplet', 'bi-globe2', 'bi-book', 'bi-palette', 'bi-music-note', 'bi-cpu', 'bi-gear'];
    exams.forEach(function(exam, i) {
        const icon = icons[i % icons.length];
        html += '<div class="col-md-6 col-lg-4">';
        html += '<div class="exam-card">';
        html += '<div class="exam-card-header">';
        html += '<div class="exam-card-icon"><i class="bi ' + icon + '"></i></div>';
        html += '<h3 class="exam-card-title">' + escapeHtml(exam.title) + '</h3>';
        html += '</div>';
        html += '<div class="exam-card-body">';
        html += '<p class="exam-card-desc">' + escapeHtml(exam.description || 'Không có mô tả.') + '</p>';
        html += '<div class="exam-meta">';
        html += '<span><i class="bi bi-question-circle"></i> ' + exam.questionCount + ' câu</span>';
        html += '<span><i class="bi bi-clock"></i> ' + exam.duration + ' phút</span>';
        html += '</div>';
        html += '<a href="exam.html?id=' + exam.id + '" class="btn btn-start">';
        html += '<i class="bi bi-play-fill"></i> Vào làm bài';
        html += '</a>';
        html += '</div></div></div>';
    });
    $('#examList').html(html);
}

$(document).ready(function() {
    loadExams();
});