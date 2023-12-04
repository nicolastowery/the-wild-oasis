import supabase, { supabaseUrl } from "./supabase";

export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

// Modern front end development doesn't pass in multiple argumnets, rather a single object with multiple arguments
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  // 1. Update password OR fullName (seperate forms)
  let updateData;

  // only one of these can be true at once
  if (password) updateData = { password };

  // fullName is set in data.fullName
  if (fullName) updateData = { data: { fullName } };

  const { data: updatedUserFullName, error: updatedUserFullNameError } =
    await supabase.auth.updateUser(updateData);

  if (updatedUserFullNameError)
    throw new Error(updatedUserFullNameError.message);
  if (!avatar) return updatedUserFullName;

  // 2. Upload the avatar image
  const fileName = `avatar-${updatedUserFullName.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUserAvatar, error: updatedUserAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedUserAvatarError) throw new Error(updatedUserAvatarError.message);
  return updatedUserAvatar;
};
