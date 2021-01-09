<template>
  <div class="container">
    <h1 class="m-3 font-semibold">Here's Your All Time Favourite Album</h1>
    <div>
      <h1 class="text-4xl font-semibold">Album {{ albumName }}</h1>
      <div class="flex w-full mt-10 items-center justify-center bg-grey-lighter">
        <form enctype="multipart/form-data" novalidate>
          <label
              class=" flex flex-col py-2  items-center bg-white text-blue rounded-lg shadow-lg
              uppercase border border-blue cursor-pointer"
          >
            <svg
                class="w-8 h-8"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
              <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12
                  1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span class="mt-2 text-black-50">Select a file</span>
            <input @change="onFileChange" accept="image/*" type="file" class="hidden" />
          </label>
        </form>
      </div>
      <div class="text-2xl mt-4">List Of Photos</div>
      <div class="flex flex-wrap justify-center w-full" v-if="photos">
        <div class="shadow-xl mt-4" v-for="(photo, idx) in photos" :key="idx">
          <amplify-s3-image
              level="protected"
              :img-key="photo.thumbnail ? photo.thumbnail.key : photo.fullsize.key"
              class="w-4/12 m-5 "
          ></amplify-s3-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Album",
  mounted() {
    this.getPhotos();
  },
  data: () => ({
    photos: [],
    albumName: "",
  }),
  methods: {
    async onFileChange(file) {
      if (!file.target || !file.target.files[0]) {
        return;
      }
      try {
        await this.$store.dispatch("album/createPhoto", {
          file: file.target.files[0],
          id: this.id,
        });
        await this.getPhotos();
      } catch (error) {
        console.log("error create photo", error);
      }
    },
    async getPhotos() {
      const album = await this.$store.dispatch("album/getAlbum", this.id);
      this.photos = album.data.getAlbum.photos.items;
      this.albumName = album.data.getAlbum.name;
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  }
}
</script>

<style lang="sass" scoped>
h1
 font-size: 28px

</style>