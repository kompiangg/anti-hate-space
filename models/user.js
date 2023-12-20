import supabase from "@utils/supabase";

class User {
  constructor({ id, name, username, email, image }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.image = image;
  }

  async save() {
    const { data, error } = await supabase.from("users").upsert([
      {
        name: this.name,
        username: this.username,
        email: this.email,
        image: this.image,
      },
    ]);

    if (error) {
      throw error;
    }

    return;
  }

  static async findByEmail(email) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return undefined;
    }

    return new User(data[0]);
  }

  static async findByID(id) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return undefined;
    }

    return new User(data[0]);
  }
}

export default User;
