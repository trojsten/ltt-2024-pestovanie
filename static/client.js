document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("window");
  const closeBtn = document.getElementById("close");
  const overlay = document.getElementById("overlay");
  const modalContent = document.getElementById("modal-content");
  const modalHeader = document.getElementById("modal-header");
  const inventoryBtn = document.getElementById("inventory-btn");
  const plantBtn = document.getElementById("plant-btn");
  const craftBtn = document.getElementById("craft-btn");

  closeBtn.addEventListener("click", () => {
    modal.style.opacity = "0";
    overlay.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
      overlay.style.display = "none";
    }, 500);
  })

  inventoryBtn.addEventListener("click", () => {
    openModal("/inventory", "Inventár")
  })

  plantBtn.addEventListener("click", () => {
    openModal("/plant", "Vyber si rastlinu na pestovanie")
  })

  craftBtn.addEventListener("click", () => {
    openModal("/craft", "Vyber si recept na výrobu")
  })

  async function openModal(url, header) {
    const res = await fetch(url)
    const text = await res.text()
    modalContent.innerHTML = text
    modalHeader.innerHTML = header
    modal.style.display = "block";
    overlay.style.display = "block";
    setTimeout(() => {
      modal.style.opacity = "1";
      overlay.style.opacity = "0.7";
    }, 0);
  }
})
