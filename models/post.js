import supabase from "@utils/supabase";
import User from "@models/user";

class Post {
  constructor(content, { id, user_id, created_at, user }) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.created_at = created_at;
    this.user = user;
  }

  async save() {
    if (!this.user_id || !this.content) {
      throw new Error("bad request");
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        user_id: this.user_id,
        content: this.content,
      },
    ]);

    if (error) {
      console.error(error);
      throw error;
    }

    return;
  }

  static async deleteByID(id) {
    const { data, error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  static async findByID(id) {
    const { data, error } = await supabase
      .from("posts")
      .select("*, users:user_id(*)")
      .eq("id", id)
      .limit(1);

    if (error) {
      console.error(error);
      throw error;
    }

    if (data.length === 0) {
      return undefined;
    }

    return new Post(data[0].content, {
      id: data[0].id,
      user_id: data[0].user_id,
      created_at: data[0].created_at,
      user: new User(data.users),
    });
  }

  static async findByUserID(userID) {
    const { data, error } = await supabase
      .from("posts")
      .select("*, users:user_id(*)")
      .eq("user_id", userID)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      throw error;
    }

    if (data.length === 0) {
      return [];
    }

    return data.map((post) => {
      return new Post(post.content, {
        user_id: post.user_id,
        id: post.id,
        created_at: post.created_at,
        user: new User(post.users),
      });
    });
  }

  static async getAll() {
    const { data, error } = await supabase
      .from("posts")
      .select("*, users:user_id(*)")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      throw error;
    }

    if (data.length === 0) {
      return [];
    }

    return data.map((post) => {
      return new Post(post.content, {
        id: post.id,
        user_id: post.user_id,
        created_at: post.created_at,
        user: new User(post.users),
      });
    });
  }
}

export default Post;
