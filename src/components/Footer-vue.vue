<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{ name: 'HomeView' }">FireBlogs</router-link>
                <ul>
                           <li>
                            <a href="#"><img src="../assets/Icons/youtube-brands.svg" class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><img src="../assets/Icons/twitter-brands.svg" class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><img src="../assets/Icons/instagram-brands.svg" class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><img src="../assets/Icons/linkedin-brands.svg" class="svg-icon"/></a>
                        </li>
                    </ul> 
                </div>
                <div class="col-2">
                    <ul>
                        <router-link class="link" :to="{ name: 'HomeView' }">Home</router-link>
                        <router-link class="link" :to="{ name: 'BlogsView' }">Blogs</router-link>
                        <router-link v-if="admin" class="link"  :to="{name:'CreatePost'}">Create Post</router-link>
                        <router-link v-if="!user" class="link" :to="{ name: 'RegisterView' }">Login In / Register</router-link>
                    </ul>
                </div>
            </div>
            <div class="right">
                <p>Copyright 2024 All Rights Reserved</p>
            </div>
        </div>
    </footer>
</template>

<script>
 
export default {
    name: "Footer-vue",
    components: {
       
    },
    
    computed:{
        user(){
            return this.$store.state.user;
        },
        admin(){
            return this.$store.state.profileAdmin;
        }
    }
};
</script>

<style scoped>
footer {
    margin-top: auto;
    padding: 100px 25px;
    background-color: #303030;

    .container {
        display: flex;
        flex-direction: column;
        gap: 32px;

        @media (min-width: 800px) {
            flex-direction: row;
            gap: 0;
        }
    

    > div {
        display: flex;
        flex: 1;
    }

    .left {
        display: flex;
        flex-direction: column;
        gap: 32px;
        color: #fff;
        align-items: center;

        @media (min-width: 800px) {
            flex-direction: row;
            align-items: initial;
            gap: 0;
        }

        .header {
            font-size: 24px;
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            @media(min-width: 800px){
                text-align: initial;
            }
        }

        ul {
            gap: 16px;
            list-style: none;
            display: flex;

            .col-1,
            .col-2 {
                display: flex;
                flex: 1;
                gap: 32px;

                @media (min-width: 800px) {
                    gap: 0;
                }
            }

            .col-1 {
                flex-direction: column;

                h2 {
                    text-align: center;

                    @media (min-width: 800px) {
                        text-align: initial;
                    }
                }

                ul {
                    margin-top: auto;

                    li {
                        display: flex;
                        align-items: center;

                        .svg-icon {
                            width: 24px;
                            height: auto;
                            color: #fff;
                        }
                    }
                }
            }

            .col-2 {
                ul {
                    height: 100%;
                    justify-content: center;
                    flex-direction: row;
                    flex-wrap: wrap;

                    @media (min-width: 800px) {
                        flex-direction: column;
                    }

                    .link {
                        font-size: 16px;
                        font-weight: 500;
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }
    }

    .right {
        display: flex;
        flex-direction: column;
        gap: 32px;
        color: #fff;
        align-items: center;

        @media (min-width: 800px) {
            align-items: flex-end;
            gap: 0;
        }

        p {
            margin-top: auto;
        }
    }}
}
</style>
