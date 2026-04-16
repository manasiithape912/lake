function showPage(page) {
    document.querySelectorAll('.container').forEach(p => p.classList.add('hidden'));
    document.getElementById(page).classList.remove('hidden');

    if (page === 'track') loadIssues();
    if (page === 'admin') loadAdmin();
}

function saveIssue() {
    let issue = {
        id: Date.now(),
        type: document.getElementById("type").value,
        desc: document.getElementById("desc").value,
        img: document.getElementById("img").value,
        loc: document.getElementById("loc").value,
        status: "Pending"
    };

    let issues = JSON.parse(localStorage.getItem("issues")) || [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));

    alert("Issue Reported Successfully!");
    showPage('track');
}

function getStatusClass(status) {
    if (status === "Pending") return "pending";
    if (status === "In Progress") return "progress";
    return "resolved";
}

function loadIssues() {
    let issues = JSON.parse(localStorage.getItem("issues")) || [];
    let container = document.getElementById("issues");
    container.innerHTML = "";

    issues.forEach(issue => {
        container.innerHTML += `
        <div class="card">
            <b>${issue.type}</b>
            <p>${issue.desc}</p>
            <p><small>${issue.loc}</small></p>
            ${issue.img ? `<img src="${issue.img}" width="100%" style="border-radius:8px;">` : ""}
            <p class="status ${getStatusClass(issue.status)}">${issue.status}</p>
        </div>`;
    });
}

function loadAdmin() {
    let issues = JSON.parse(localStorage.getItem("issues")) || [];
    let container = document.getElementById("adminIssues");
    container.innerHTML = "";

    issues.forEach(issue => {
        container.innerHTML += `
        <div class="card">
            <b>${issue.type}</b>
            <p>${issue.desc}</p>
            <p>Status: ${issue.status}</p>

            <button onclick="updateStatus(${issue.id}, 'In Progress')">In Progress</button>
            <button onclick="updateStatus(${issue.id}, 'Resolved')">Resolved</button>
        </div>`;
    });
}

function updateStatus(id, status) {
    let issues = JSON.parse(localStorage.getItem("issues")) || [];

    issues = issues.map(issue => {
        if (issue.id == id) issue.status = status;
        return issue;
    });

    localStorage.setItem("issues", JSON.stringify(issues));
    loadAdmin();
}