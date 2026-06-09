
const STORAGE_KEY = 'exam_user_name';
let currentUser = '';


function checkUser() {
    currentUser = localStorage.getItem(STORAGE_KEY) || '';
    if (!currentUser) {
        const modal = new bootstrap.Modal(document.getElementById('nameModal'));
        modal.show();
    } else {
        $('#userNameDisplay').text(currentUser);
    }
}

function saveName() {
    const name = $('#userNameInput').val().trim();
    if (!name) {
        alert('Vui lòng nhập tên của bạn!');
        return;
    }
    currentUser = name;
    localStorage.setItem(STORAGE_KEY, name);
    $('#userNameDisplay').text(name);
    const modal = bootstrap.Modal.getInstance(document.getElementById('nameModal'));
    if (modal) modal.hide();
}

function changeName() {
    currentUser = localStorage.getItem(STORAGE_KEY) || '';
    $('#userNameInput').val(currentUser);
    const modal = new bootstrap.Modal(document.getElementById('nameModal'));
    modal.show();
}

function logout() {
    if (confirm('Bạn có chắc muốn đổi tài khoản? Điểm của bạn vẫn được lưu.')) {
        currentUser = '';
        localStorage.removeItem(STORAGE_KEY);
        $('#userNameDisplay').text('Học Sinh');
        checkUser();
    }
}

function viewScores() {
    currentUser = localStorage.getItem(STORAGE_KEY) || '';
    if (!currentUser) return;
    const allScores = JSON.parse(localStorage.getItem('exam_scores_' + currentUser) || '{}');
    const examIds = Object.keys(allScores);
    let html = '';

    if (examIds.length === 0) {
        html = '<p class="text-muted text-center">Chưa có điểm nào. Hãy làm bài kiểm tra nhé!</p>';
    } else {
        html = '<div class="list-group list-group-flush">';
        examIds.forEach(function(id) {
            const s = allScores[id];
            const badgeClass = s.score >= 70 ? 'bg-success' : (s.score >= 40 ? 'bg-warning text-dark' : 'bg-danger');
            const clickable = s.resultId ? ' list-group-item-action cursor-pointer' : '';
            const onClick = s.resultId ? ' onclick="window.location.href=\'result.html?id=' + s.resultId + '\'"' : '';
            html += '<div class="list-group-item d-flex justify-content-between align-items-center' + clickable + '"' + onClick + '>';
            html += '<div><strong>' + escapeHtml(s.title) + '</strong><br><small class="text-muted">' + s.date + '</small></div>';
            html += '<span class="badge rounded-pill ' + badgeClass + ' fs-6">' + s.score + ' điểm</span>';
            html += '</div>';
        });
        html += '</div>';
    }

    $('#scoresContent').html(html);
    const modal = new bootstrap.Modal(document.getElementById('scoresModal'));
    modal.show();
}


function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}


function getLocalStorageSize() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        total += (key.length + (value ? value.length : 0)) * 2; 
    }
    return total;
}

function cleanLocalStorage() {
    const MAX_SIZE = 1.8 * 1024 * 1024; 
    if (getLocalStorageSize() < MAX_SIZE) return;

    const results = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('exam_result_')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                results.push({ key: key, date: data.date || '0' });
            } catch (e) {
                results.push({ key: key, date: '0' });
            }
        }
    }
    results.sort(function(a, b) { return a.date.localeCompare(b.date); });

    for (let j = 0; j < results.length; j++) {
        if (getLocalStorageSize() < MAX_SIZE * 0.7) break;
        localStorage.removeItem(results[j].key);
    }
}


$(document).ready(function() {
    checkUser();
});

$(document).on('keypress', '#userNameInput', function(e) {
    if (e.which === 13) saveName();
});
