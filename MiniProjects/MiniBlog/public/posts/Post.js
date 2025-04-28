export class Post {
  constructor({ id = 0, title = '', content = '', thumbnailUrl='' ,authorId = 1} = {}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.thumbnailUrl = thumbnailUrl;
    this.authorId = authorId
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      thumbnailUrl:this.thumbnailUrl,
      authorId: this.authorId
    };
  }
}
