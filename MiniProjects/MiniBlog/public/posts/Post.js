export class Post {
  constructor({ id = null, title = '', content = '' } = {}) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content
    };
  }
}
