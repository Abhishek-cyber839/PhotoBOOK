<template>
  <div class="container">
    <h1 class="m-3">All Your Favourite Albums at One Place</h1>
    <div>
      <h3 class="text-3xl">Create Or Choose An Album</h3>
      <div class="flex flex-col m-auto w-64">
        <input
            class="my-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            placeholder="Album Name..."
            type="text"
            v-model="albumName"
        />
        <button class="btn-outline-info btn m-5" @click="createAlbum()">Create Album</button>
      </div>
      <div class="text-red-500">{{ error }}</div>
      <hr />
      <h5 class="mt-4 text-2xl">List Of Albums</h5>
      <div class="flex flex-wrap w-full m-4 justify-center">
        <div
            v-for="(album, idx) in albums"
            :key="idx"
            class="cursor-pointer  mt-4 ml-4 w-3/12 h-24 shadow-xl flex items-center justify-center"
            @click="openAlbumDetail(album)"
        >
          <div class="py-4 px-4 text-2l">{{ album.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Albums",
  async mounted() {
    await this.$store.dispatch("album/getAlbumsData");
  },
  data: () => ({ albumName: "", error: "" }),
  methods: {
    openAlbumDetail(album) {
      this.$router.push(`/album/${album.id}`);
    },
    async createAlbum() {
      this.error = "";
      if (!this.albumName) {
        this.error = "Please enter an album name";
        return;
      }
      const newAlbum = {
        name: this.albumName,
        owner: this.user.username,
        ownerId: this.user.id,
      };
      await this.$store.dispatch("album/createAlbum", newAlbum);
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      albums: "album/albums",
    }),
  }
}
</script>

<style lang="sass" scoped>

h1
  font-size: 28px

hr
  height: 3px

</style>