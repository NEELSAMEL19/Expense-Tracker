import Layout from "../../layouts/Layout"
import ExpenseChart from "./ExpenseChart"
import ExpenseList from "./ExpenseList"


const Expense = () => {
    return (
        <Layout>
            <ExpenseChart />
            <ExpenseList />
        </Layout>
    )
}

export default Expense