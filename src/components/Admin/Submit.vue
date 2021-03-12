<!--历史界面-->
<template>
    <div>

        <el-card v-loading="loading">
            <el-row type="flex" justify="end" style="padding-bottom: 5px">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link" style="font-size: 18px;margin-right: 4px;padding-bottom: 2px">
                        搜索方式<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="题目Id">题目Id</el-dropdown-item>
                        <el-dropdown-item command="提交Id">提交Id</el-dropdown-item>
                        <el-dropdown-item command="用户">用户</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-input v-model="input" :placeholder=SearchMethod style="padding-right: 5px"/>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-row>
            <el-row>
                <el-table :data="tableData" @cell-click="ProblemClick" size="small" :cell-style="ratingcolor" border
                          height="500">

                    <el-table-column prop="time" label="时间"></el-table-column>
                    <el-table-column prop="submitId" label="提交Id号"/>
                    <el-table-column prop="username" label="用户"/>
                    <el-table-column prop="problemId" label="题目Id"/>
                    <el-table-column prop="language" label="语言"/>
                    <el-table-column prop="acStatus" label="状态"/>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleSource(scope.$index)">查看源码
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleReJudge(scope.$index)">重 判
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentpage"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totaluser"
                ></el-pagination>
            </el-row>
        </el-card>
        <Modal v-model="modal"
               title="code">
            <pre> {{text}} </pre>
        </Modal>

    </div>
</template>

<script>


    export default {
        name: "Submit",

        data() {
            return {
                SearchMethod:"请输入题目Id",

                currentpage: 1,
                pagesize: 50,
                totaluser: 0,

                modal: false,
                text: "",

                tableData: [
                    {
                        time: "2017-16-9 12:55:23",
                        submitId: 12,
                        username: "tim",
                        problemId: 12,
                        language: "C++",
                        acStatus: "WA",
                        src: "5678",
                    },
                ],
                loading: true
            };
        },
        methods: {
            handleCommand(command){
                this.SearchMethod="请输入"+command;
            },
            handleReJudge(index) {
                console.log("rejude " + index);
            },
            handleSource(index) {
                console.log('row', index);
                this.text = this.tableData[index].src;
                // 弹对话框显示代码
                this.modal = true;
            },

            getData(limit, offset) {                //获取数据
                this.$axios({
                    method: 'get',
                    url: 'game',
                    params: {
                        userId: localStorage.getItem("userId"),
                        pageSize: limit,
                        pageNum: offset
                    }
                }).then(response => {
                    console.log(response.data);
                    this.tableData = response.data.data.records;
                    this.totaluser = response.data.data.total;
                    this.loading = false;
                })
                    .catch(error => {
                        this.loading = false;
                        this.$message.error("服务器错误，获取数据失败");
                        console.log(
                            "服务器错误！" + "(" + JSON.stringify(error) + ")"
                        );
                    });
            },
            handleSizeChange(val) {
                this.pagesize = val;
                this.getData(this.pagesize, this.currentpage);
            },
            handleCurrentChange(val) {
                this.currentpage = val;
                this.getData(this.pagesize, this.currentpage);
            }
        },
        created() {
            this.loading = false;
            // this.getData(50, 0);
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-carousel__item:nth-child(2n) {
        background-color: #afd1f1;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #a7f5ff;
    }

    .image {
        width: 130px;
        height: 130px;
        display: block;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
