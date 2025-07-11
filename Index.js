
  const today = new Date();
  const number = `SKSY${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  document.getElementById('invoiceNumber').value = number;

function addRow() {
  const tbody = document.querySelector("table tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${tbody.children.length + 1}</td>
    <td><input type="text" placeholder="Description"></td>
    <td><input type="number" placeholder="Rate" oninput="calculate()"></td>
    <td><input type="number" placeholder="Qty" oninput="calculate()"></td>
    <td class="taxable">0</td>
    <td class="gst">0</td>
    <td class="total">0</td>
  `;
  tbody.appendChild(row);
}
function calculate() {
  let taxableTotal = 0;
  let gstTotal = 0;
  let grandTotal = 0;

  document.querySelectorAll("table tbody tr").forEach(row => {
    const rate = parseFloat(row.querySelector("td:nth-child(3) input")?.value) || 0;
    const qty = parseFloat(row.querySelector("td:nth-child(4) input")?.value) || 0;
    const taxable = rate * qty;
    const gst = taxable * 0.05;
    const total = taxable + gst;

    row.querySelector(".taxable").innerText = taxable.toFixed(2);
    row.querySelector(".gst").innerText = gst.toFixed(2);
    row.querySelector(".total").innerText = total.toFixed(2);

    taxableTotal += taxable;
    gstTotal += gst;
    grandTotal += total;
  });

  document.querySelector(".totals-right").innerHTML = `
    <p>Taxable INR ${taxableTotal.toFixed(2)}</p>
    <p>IGST INR ${gstTotal.toFixed(2)}</p>
    <p><strong>Total INR ${grandTotal.toFixed(2)}</strong></p>
  `;

  document.querySelector(".amount-in-words").innerText = `Total in Words: ${convertNumberToWords(grandTotal)} Only`;
}

function convertNumberToWords(amount) {
  // Simple example (expand if needed)
  if (amount === 0) return "Zero";
  return "Indian Rupee " + amount.toFixed(2);
}