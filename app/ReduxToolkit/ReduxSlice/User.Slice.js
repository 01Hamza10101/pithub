"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const defaultConfig = () => {
  const accessToken = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

// Helper function to handle errors
const handleError = (error, rejectWithValue) => {
  if (error.response && (error.response.data.message || error.response.data.error)) {
    return rejectWithValue({ message: error.response.data.message || error.response.data.error });
  }
  return rejectWithValue({ message: "An error occurred while processing the request." });
}

export const GetUserData = createAsyncThunk("user/GetUserData", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/user", defaultConfig());
    return res.data;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const CreateRepo = createAsyncThunk("user/CreateRepo", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository", data, defaultConfig());
    return res.data;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const GetRepos = createAsyncThunk("user/GetRepos", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository/Get", data, defaultConfig());
    return { type: data.type, ...res.data };
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const getFileContent = createAsyncThunk("user/getFileContent", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository/getFileContent", data, defaultConfig());
    return { ...data,...res.data };
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const commitChanges = createAsyncThunk("user/commitChanges", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository/CommitChanges",data, defaultConfig());
    // return { type: data?.type, name: data.name, ...res.data };
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const renamePath = createAsyncThunk("user/renamePath", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository/renamePath",data, defaultConfig());
    // return { type: data?.type, name: data.name, ...res.data };
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const createFolder = createAsyncThunk("user/createFolder", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository/createFolder",data, defaultConfig());
    // return { type: data?.type, name: data.name, ...res.data };
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const createFile = createAsyncThunk("user/createFile", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository/createFile",data, defaultConfig());
    // return { type: data?.type, name: data.name, ...res.data };
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const deletePath = createAsyncThunk("user/deletePath", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository/deletePath",data, defaultConfig());
    // return { type: data?.type, name: data.name, ...res.data };
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const uploadFile = createAsyncThunk(
  "user/uploadFile",
  async ({ file, fileName }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", fileName); // optional

      const res = await axios.post("/api/repository/uploadFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (error) {
      console.error("Upload error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const AddStar = createAsyncThunk("user/AddStar", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/repository/AddStar", { name: data.name }, defaultConfig());
    return { type: data?.type, name: data.name, ...res.data };
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});


export const Getcontributionrecords = createAsyncThunk("user/Getcontributionrecords", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/contributionrecords", data, defaultConfig());
    return res.data;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const UpdateProfile = createAsyncThunk("user/UpdateProfile", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/settings/profile", data, defaultConfig());
    return res.data;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});


export const GetFolder = createAsyncThunk("user/GetFolder",async (data, { rejectWithValue }) => {
    try {
      console.log("data",data);
      const res = await axios.get(`/api/repository/Folders?prefix=${data?.prefix}`,defaultConfig());
      return res.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);


const initialState = {
  message: "",
  user: "",
  repositories: "",
  starredrepos: "",
  CodeContent:{path:"",content: ""},
  folders: [],
  files: [],
  contributionrecords:[]
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    RemoveOrderId(state) {
      state.OrderId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(GetUserData.rejected, (state, action) => {
        console.error("Error fetching user data:", action.payload.message);
      });
    builder
      .addCase(commitChanges.fulfilled, (state, action) => {
      })
      .addCase(commitChanges.rejected, (state, action) => {
        console.error("Error creating repository:", action.payload.message);
      });
    builder
      .addCase(renamePath.fulfilled, (state, action) => {
      })
      .addCase(renamePath.rejected, (state, action) => {
        console.error("Error creating repository:", action.payload.message);
      });
    builder
      .addCase(createFolder.fulfilled, (state, action) => {
      })
      .addCase(createFolder.rejected, (state, action) => {
        console.error("Error creating repository:", action.payload.message);
      });
    builder
      .addCase(createFile.fulfilled, (state, action) => {
      })
      .addCase(createFile.rejected, (state, action) => {
        console.error("Error creating repository:", action.payload.message);
      });  
    builder
      .addCase(deletePath.fulfilled, (state, action) => {
      })
      .addCase(deletePath.rejected, (state, action) => {
        console.error("Error creating repository:", action.payload.message);
      });
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
      })
      .addCase(uploadFile.rejected, (state, action) => {
        console.error("Error creating repository:", action.payload.message);
      });    
    builder
      .addCase(CreateRepo.fulfilled, (state, action) => {
        // Handle successful repo creation if needed
      })
      .addCase(CreateRepo.rejected, (state, action) => {
        console.error("Error creating repository:", action.payload.message);
      });
    builder
      .addCase(GetRepos.fulfilled, (state, action) => {
        if (action.payload.type === "starred") {
          state.starredrepos = action.payload.repositories;
        } else {
          state.repositories = action.payload.repositories;
        }
      })
      .addCase(GetRepos.rejected, (state, action) => {
        console.error("Error fetching repositories:", action.payload.message);
      });
    builder
      .addCase(getFileContent.fulfilled, (state, action) => {
          state.CodeContent.content = action.payload.content;
          state.CodeContent.path = action.payload.path;
      })
      .addCase(getFileContent.rejected, (state, action) => {
        console.error("Error fetching repositories:", action.payload.message);
      });
    builder
      .addCase(AddStar.fulfilled, (state, action) => {
        const { name: repoName, starred, type } = action.payload;
        let repo;
        if (type === "starred" && Array.isArray(state.starredrepos)) {
          repo = state.starredrepos.find((repo) => repo?.name === repoName);
        } else {
          repo = state.repositories.find((repo) => repo?.name === repoName);
        }

        if (repo) {
          repo.stars = starred ? repo.stars + 1 : Math.max(repo.stars - 1, 0);
          if (!starred && Array.isArray(state.starredrepos)) {
            state.starredrepos = state.starredrepos.filter((repo) => repo.name !== repoName);
          }
        }

        if (starred) {
          if (!state.user.activity.starred.includes(repoName)) {
            state.user.activity.starred.push(repoName);
          }
        } else {
          state.user.activity.starred = state.user.activity.starred.filter(
            (name) => name !== repoName
          );
        }
      })
      .addCase(AddStar.rejected, (state, action) => {
        console.error("Error toggling star on repository:", action.payload?.message || action.error.message);
      });
    builder
      .addCase(GetFolder.fulfilled, (state, action) => {
        state.folders = action.payload.folders;
        state.files = action.payload.files;
      })
      .addCase(GetFolder.rejected, (state, action) => {
        console.error("Error fetching folder structure:", action.payload?.message || action.error.message);
      });
    builder
      .addCase(UpdateProfile.fulfilled, (state, action) => {
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        console.error("Error fetching folder structure:", action.payload?.message || action.error.message);
      });
    builder
      .addCase(Getcontributionrecords.fulfilled, (state, action) => {
        state.contributionrecords = action.payload.repositories;
      })
      .addCase(Getcontributionrecords.rejected, (state, action) => {
        console.error("Error fetching folder structure:", action.payload?.message || action.error.message);
      });
  }
});

export const { RemoveOrderId } = UserSlice.actions;
export default UserSlice.reducer;
