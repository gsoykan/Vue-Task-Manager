<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <h1>Latest Tasks</h1>
    <!-- CREATE TASKS HERE   -->
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="tasks-container">
      <div
        class="tasks"
        v-for="(task, index) in tasks"
        v-bind:item="task"
        v-bind:index="index"
        v-bind:key="task._id"
      >
        <p class="text">{{ task.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from "../TaskService";

export default {
  name: "TaskComponent",
  data() {
    return {
      tasks: [],
      error: "",
      description: ""
    };
  },
  async created() {
    try {
      this.tasks = await TaskService.getTasks();
    } catch (error) {
      this.error = error.message;
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
