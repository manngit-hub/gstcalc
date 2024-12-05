let display = document.getElementById("display");

// Append the clicked button value to the display
function append(value) {
  display.value += value;
}

// Clear the display
function clearDisplay() {
  display.value = "";
}

// Remove the last character from the display
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Evaluate the expression in the display
function calculate() {
  try {
    let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100');
    let result = eval(expression);
    display.value = result.toFixed(2);
  } catch (e) {
    display.value = "Error";
  }
}

// Add GST at the given rate
function addGST(rate) {
  let total = parseFloat(display.value.replace(/×/g, '*').replace(/÷/g, '/'));

  // Validate the input
  if (isNaN(total) || total <= 0) {
    display.value = "Invalid Amount";
    return;
  }

  let gst, sgst, cgst, amount;

  if (rate > 0) {
    gst = (total * rate) / 100;
    sgst = gst / 2;
    cgst = gst / 2;
    amount = total;

    display.value = `Amount: ₹${amount.toFixed(2)}\nSGST (${rate / 2}%): ₹${sgst.toFixed(2)}\nCGST (${rate / 2}%): ₹${cgst.toFixed(2)}\nTotal: ₹${(amount + gst).toFixed(2)}`;
  } else {
    gst = (total * Math.abs(rate)) / (100 + Math.abs(rate));
    sgst = gst / 2;
    cgst = gst / 2;
    amount = total - gst;

    display.value = `Amount: ₹${amount.toFixed(2)}\nSGST (${Math.abs(rate) / 2}%): ₹${sgst.toFixed(2)}\nCGST (${Math.abs(rate) / 2}%): ₹${cgst.toFixed(2)}\nTotal: ₹${total.toFixed(2)}`;
  }
}

// Copy the result to clipboard
function copyToClipboard() {
  navigator.clipboard.writeText(display.value);
}
