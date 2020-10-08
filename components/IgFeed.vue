<template lang="html">
    <div class="instagram-feed">
        <h1>IG Feed</h1>
        <slot
            :posts="posts"
            :user-data="userData"
        />
    </div>
</template>

<script>
export default {
    props: {
        username: {
            type: String,
            default: "subliminalprojects"
        }
    },
    data() {
        return {
            posts: [],
            userData: {}
        }
    },
    async fetch() {
        // Abort if no username set
        if (!this.username) {
            return
        }
        // Get Instagram data using the unoffical website API
        const igData = await fetch(
            `https://www.instagram.com/${this.username}/?__a=1`
        )
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                console.error("Instagram Fetch Error:", error)
            })
            console.log("IG DATA", igData)
        // Set instagram data in memory
        // this.userData = _get(igData, "graphql.user", {})
        // this.posts = _get(
        //     igData,
        //     "graphql.user.edge_owner_to_timeline_media.edges",
        //     []
        // ).map(obj => obj.node)
        // Get video URLs for any slides
        //this.fetchVideoUrls()
    },
    fetchOnServer: false,    
    methods: {
        fetchVideoUrls() {
            this.posts.map((obj, index) => {
                if (obj.is_video && !obj.video_data) {
                    // Fire off a fetch, when it returns, set the video data on the post
                    fetch(`https://www.instagram.com/p/${obj.shortcode}/?__a=1`)
                        .then(response => response.json())
                        .then(data => {
                            obj.video_data = _get(
                                data,
                                "graphql.shortcode_media",
                                ""
                            )
                        })
                }
                return obj
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>