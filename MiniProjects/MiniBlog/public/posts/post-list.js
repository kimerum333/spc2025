import { PostCard } from "./PostCard.js";

const List={
    showingFrom : 0,
    showingTo : -1,
    serverTotal : -1,
    cachedPosts : []
}
const Request={
    firstLoad : true,
    requestSize:10,
    loadPosts(){
        let offset = 0;
        let limit = this.requestSize;
        if(!this.firstLoad){
            offset = List.showingFrom;
        }

        axios.get(`/api/posts/lists?offset=${offset}&limit=${limit}`)
        .then((response)=>{
            const container = document.getElementById('post-card-container');
            console.log(response.data);
            List.serverTotal = response.data.totalCount;
            const posts = response.data.posts;
            posts.forEach(element => {
                let postCard = new PostCard(element);
                let div = postCard.makeDiv();
                container.appendChild(div);
            });
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

function init(){
    Request.loadPosts();
}

document.addEventListener('DOMContentLoaded',()=>{
    init();
})