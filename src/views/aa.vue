<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview"></BlogCoverPreview>
    <Loading v-show="loading"></Loading>
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span> {{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="cover-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="coverPhoto"
            name="cover-photo"
            id="cover-photo"
            accept=".png, .jpg, .jpeg"
            @change="coverPhotoChange"
          />
          <span>Cover Photo chosen: {{ coverPhotoName }}</span>
        </div>
        <div class="upload-file">
          <label for="post-photo">Upload Post Photo</label>
          <input
            type="file"
            ref="postPhoto"
            name="post-photo"
            id="post-photo"
            accept=".png, .jpg, .jpeg"
            @change="postPhotoChange"
          />
          <span>Post Photo chosen: {{ postPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <div ref="quillEditorContainer"></div>
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, storage } from "../firebase/firebaseInit";
import Quill from 'quill';
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Loading from "../components/LoadingView.vue";

export default {
  name: "CreatePost",
  components: {
    BlogCoverPreview,
    Loading,
  },
  data() {
    return {
      error: null,
      errorMsg: null,
      file: null,
      coverPhotoFile: null,
      quill: null,
      loading: false,
    };
  },
  methods: {
    async imageHandler(file, Editor, cursorLocation, resetUploader) {
      try {
        const storageReference = storageRef(storage, `documents/blogCoverPostPhotos/${file.name}`);
        const docRef = uploadBytesResumable(storageReference, file);
        docRef.on('state_changed', 
          (snapshot) => {
            console.log(snapshot);
          }, 
          (error) => {
            console.error("Error uploading image:", error);
          }, 
          async () => {
            // Handle successful uploads
            const downloadURL = await getDownloadURL(docRef.snapshot.ref);
            Editor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    openPreview() {
      console.log(this.blogHTML);
      this.$store.commit("openPhotoPreview");
    },
    coverPhotoChange() {
      this.coverPhotoFile = this.$refs.coverPhoto.files[0];
      this.$store.commit("fileNameChange", this.coverPhotoFile?.name || '');
      this.$store.commit("createFileURL", URL.createObjectURL(this.coverPhotoFile));
    },
    postPhotoChange() {
      this.file = this.$refs.postPhoto.files[0];
    },
    async uploadBlog() {
      if (this.blogTitle.length === 0 || this.blogHTML.length === 0) {
        this.error = true;
        this.errorMsg = "Please ensure Blog Title & Blog Post have been filled!";
        setTimeout(() => this.error = false, 4000);
        return;
      }

      if (!this.file || !this.coverPhotoFile) {
        this.error = true;
        this.errorMsg = "Please ensure you uploaded both cover photo and post photo!";
        setTimeout(() => this.error = false, 4000);
        return;
      }

      this.loading = true;

      // Create promises for both uploads
      const coverPhotoUploadTask = uploadBytesResumable(
        storageRef(storage, `documents/BlogCoverPhotos/${this.coverPhotoFile.name}`),
        this.coverPhotoFile
      );

      const postPhotoUploadTask = uploadBytesResumable(
        storageRef(storage, `documents/BlogPostPhotos/${this.file.name}`),
        this.file
      );

      try {
        // Wait for both uploads to complete
        const [coverPhotoSnapshot, postPhotoSnapshot] = await Promise.all([
          new Promise((resolve, reject) => {
            coverPhotoUploadTask.on(
              'state_changed',
              (snapshot) => console.log("Cover photo snapshot:", snapshot),
              reject,
              async () => {
                resolve(await getDownloadURL(coverPhotoUploadTask.snapshot.ref));
              }
            );
          }),
          new Promise((resolve, reject) => {
            postPhotoUploadTask.on(
              'state_changed',
              (snapshot) => console.log("Post photo snapshot:", snapshot),
              reject,
              async () => {
                resolve(await getDownloadURL(postPhotoUploadTask.snapshot.ref));
              }
            );
          })
        ]);

        const timestamp = Date.now();
        const blogRef = doc(collection(db, "blogPosts"));

        console.log("Uploading blog with data:", {
          blogID: blogRef.id,
          blogHTML: this.blogHTML,
          blogCoverPhoto: coverPhotoSnapshot,
          blogCoverPhotoName: this.coverPhotoFile.name,
          blogPostPhoto: postPhotoSnapshot,
          blogPostPhotoName: this.file.name,
          blogTitle: this.blogTitle,
          profileId: this.profileId,
          date: timestamp,
        });

        await setDoc(blogRef, {
          blogID: blogRef.id,
          blogHTML: this.blogHTML || "",
          blogCoverPhoto: coverPhotoSnapshot || "",
          blogCoverPhotoName: this.coverPhotoFile.name || "",
          blogPostPhoto: postPhotoSnapshot || "",
          blogPostPhotoName: this.file.name || "",
          blogTitle: this.blogTitle || "",
          profileId: this.profileId || "",
          date: timestamp,
        });

        await this.$store.dispatch("getPost");
        this.loading = false;
        this.$router.push({
          name: "ViewBlog",
          params: { blogid: blogRef.id },
        });
      } catch (error) {
        console.error("Error uploading photos or blog:", error);
        this.error = true;
        this.errorMsg = "Error uploading blog or photos.";
        this.loading = false;
        setTimeout(() => this.error = false, 4000);
      }
    },
    getEditorContent() {
      const content = this.quill.getText();
      console.log(content);
    },
  },
  mounted() {
    this.quill = new Quill(this.$refs.quillEditorContainer, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
        ],
      },
      placeholder: this.$store.state.blogHTML,
    });
    this.quill.on('text-change', () => {
      this.blogHTML = this.quill.root.innerHTML;
    });
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    coverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    postPhotoName() {
      return this.file ? this.file.name : '';
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      }
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    background: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      min-width: 300px;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      margin-top: 16px;
      display: flex;
      align-items: center;
      label {
        margin-right: 16px;
      }
      input {
        display: none;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
      }
    }
  }
  .blog-actions {
    button {
      margin-right: 20px;
    }
  }
  .editor {
    height: 40vh;
    display: flex;
    flex-direction: column;
    margin-bottom: 78px;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      .ql-editor {
        padding: 20px 16px 30px;
      }
    }
  }
}
</style>
