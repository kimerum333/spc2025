export const readPagedPosts = (req, res) => {
    res.json([
      { id: 1, title: '첫 번째 글', content: '내용1' },
      { id: 2, title: '두 번째 글', content: '내용2' }
    ]);
  };
  
  export const createPost = (req, res) => {
    const { title, content } = req.body;
    res.status(201).json({
      message: '글이 작성되었습니다.',
      post: {
        id: Date.now(),
        title,
        content
      }
    });
  };
  