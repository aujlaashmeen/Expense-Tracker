document.addEventListener("DOMContentLoaded", function() {
const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
 let transactions = JSON.parse(localStorage.getItem("transactions")) ?? [];
 form.addEventListener("submit", addTransaction);
 function addTransaction(e){
    e.preventDefault();
    const transaction = createTransaction();
    transactions.push(transaction);
    saveToLocalStorage();
    form.reset();
    render();
 }
 function createTransaction(){
    return {
        id: Date.now(),
        title: titleInput.value,
        amount: Number(amountInput.value),
        type: typeInput.value
    };
 }
function saveToLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
 function render(){
    clearList();
    const totals = calculateTotals();
    updateSummary(totals);
    transactions.forEach(addTransactionToDOM);
    console.log("render");
 }
 function clearList(){
    list.innerHTML = "";
 }
 function calculateTotals(){
  let income = 0;
  let expense = 0;  
  transactions.forEach(({amount, type }) => {
    type === "income" ? (income += amount) : (expense += amount);
  });
  return { income, expense};
 }
 function updateSummary({ income, expense }){
  incomeEl.textContent = `$${income}`;
  expenseEl.textContent = `$${expense}`;
  balanceEl.textContent = `$${income - expense}`;
 }
 function deleteTransaction(id){
   transactions = transactions.filter(t => t.id !== id);
   saveToLocalStorage();
   render();
 }
 function addTransactionToDOM ({ id, title, amount, type }) {
    const li = document.createElement("li");
    li.classList.add(type);
    li.innerHTML = `
    <span class = "title">${title}</span>
    <span class = "amount">${type === "income" ? "+" : "-"}$${amount}</span>
    <button class="delete-btn">x</button>
    `;
    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteTransaction(id);
    });
    list.appendChild(li);
 }
 render();
});