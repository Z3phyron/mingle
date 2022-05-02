const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    console.log(content);
    console.log(req.files);
    // for uploading gallery
    let imagesUrl = [];
    if (req.files.length) {
      req.files.map((file) => {
        imagesUrl.push(
          `${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`
        );
      });
    }
    // to check post content language for direction of content
    let arabic = /[\u0600-\u06FF]/;
    if (!content)
      return res.status(403).json({ message: "please add some content !!" });
    const newPost = new Post({
      ...req.body,
      images: imagesUrl,
      lang: arabic.test(content) ? "AR" : "EN",
      user: req.user._id,
    });
    if (!newPost)
      return res.status(500).json({ message: "smothing went wrong !!" });
    //save post in db
    await newPost.save();
    // to get get user data
    let fullPost = await newPost.populate("user", "username profile_pic");
    return res.status(200).json(fullPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};
