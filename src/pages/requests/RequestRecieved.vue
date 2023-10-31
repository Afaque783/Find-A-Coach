<template>
    <div>
    <base-dialog 
    :show="!!error"
    title="An error occured!"
    @close="handleKaroError"
    >
        <p>{{ error }}</p>
    </base-dialog>
   <section>
    <base-card>
        <header>
            <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
            <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
            ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
   </section> 
    </div>
</template>

<script>
import RequestItem from '../../components/requests/Request.Item.vue';


export default {
    data(){
        return{
            isLoading:false,
            error:null
        }
    },
    components:{
        RequestItem,
    },
    computed:{
        receivedRequests(){
            return this.$store.getters['requests/requests'];
        },
        hasRequests(){
            return this.$store.getters['requests/hasRequests'];
        }
    },
    methods:{
       async loadRequests(){
            this.isLoading = true;
            try{
              await this.$store.dispatch('requests/fetchRequests');
            }catch(e){
                this.error = e.message || 'Something Failed!';
            }   
            this.isLoading = false;   
        },
        handleKaroError(){
            this.error = null;
        }
    },
    created() {
        this.loadRequests();
    }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>