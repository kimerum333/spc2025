import { Post } from "./Post.js";

export class PostCard {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.thumbnailUrl = post.thumbnailUrl;
        this.snippet = post.content.slice(0, 10) + '...';
        this.dateStr = new Date(post.createdAt).toLocaleDateString();
    }

    makeDiv() {
        const div = document.createElement('div');
        div.className = 'bg-white rounded shadow p-4 hover:shadow-lg transition';

        const img = document.createElement('img');
        img.className = 'rounded mb-2 w-[300px] h-[180px] object-fill';
        img.src = this.thumbnailUrl; // 썸네일 경로가 필요하면 post.thumbnail 등으로 교체 가능
        img.alt = 'thumbnail';

        const title = document.createElement('h2');
        title.className = 'text-lg font-semibold';
        title.textContent = this.title;

        const desc = document.createElement('p');
        desc.className = 'text-gray-600 text-sm';
        desc.textContent = this.snippet;

        // 필요한 요소들 붙이기
        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(desc);
        div.addEventListener('click',()=>{
            window.location.href = `/posts/${this.id}`;
        })
        return div;
    }
}
