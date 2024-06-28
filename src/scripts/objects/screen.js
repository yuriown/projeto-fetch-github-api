const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                <p>Seguindo: ${user.following} | Seguidores: ${user.followers}</p>
                                <br>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                            </div>
                        </div>`

        let repositoriesItens = ''
        let eventsItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br>
            <span class="repo-info"><span class="repo-forks">🍴 ${repo.forks}</span> <span class="repo-stars">⭐ ${repo.stargazers_count}</span> <span class="repo-watchers">👀 ${repo.watchers}</span> <span class="repo-language">👨‍💻 ${repo.language}</span></span></a>
           </li>`)
        user.events.forEach(events => {
            let mensagem = ''
            if (events.type === 'PushEvent') {
                mensagem = Object.values(events.payload.commits)[0].message
            } else {
                mensagem = 'Sem mensagem de commit'
            }
            eventsItens += `<li><a href="https://github.com/${events.repo.name}" target="_blank"><b>${events.repo.name}</b> - ${mensagem}</a></li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                           </div>`
        }
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = `<div class="not-found">
                                        <h1>Usuário não encontrado 😢</h1>
                                        <p>Tente novamente!</p>
                                    </div>`
    }
}

export { screen }