export class Post {
  constructor({ id = 0, title = '', content = '', authorId = 1} = {}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      authorId: this.authorId
    };
  }
}
