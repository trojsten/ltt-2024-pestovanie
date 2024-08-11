document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("window");
  const closeBtn = document.getElementById("close");
  const overlay = document.getElementById("overlay");
  const modalContent = document.getElementById("modal-content");
  const modalHeader = document.getElementById("modal-header");
  const inventoryBtn = document.getElementById("inventory-btn");
  const plantBtn = document.getElementById("plant-btn");
  const breedBtn = document.getElementById("breed-btn");
  const craftBtn = document.getElementById("craft-btn");
  const waterBtn = document.getElementById("water-btn")
  const feedBtn = document.getElementById("feed-btn")
  const makeBtn = document.getElementById('make-btn')

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

  plantBtn.addEventListener("click", async () => {
    await openModal("/plant/list", "Vyber si rastlinu na pestovanie")
    await wait(100)
    const plantList = document.querySelectorAll(".item-slots")
    plantList.forEach(plant => {
      plant.addEventListener("click", async (e) => {
        const id = plant.id.split("-")[1]
        console.log(id)
        const data = new FormData()
        data.append("item", id)
        const res = await fetch("/plant/set", {
          method: "POST",
          body: data
        })
        const json = await res.json()
        console.log(json)
        if (json.msg == 'ok') {
          location.reload()
        }
      })
    })
  })

  breedBtn.addEventListener("click", async () => {
    await openModal("/animal/list", "Vyber si zviera na chovanie")
    await wait(100)
    const animalList = document.querySelectorAll(".item-slots")
    animalList.forEach(animal => {
      animal.addEventListener("click", async (e) => {
        const id = animal.id.split("-")[1]
        const data = new FormData()
        data.append("item", id)
        const res = await fetch("/animal/set", {
          method: "POST",
          body: data
        })
        const json = await res.json()
        if (json.msg == 'ok') {
          location.reload()
        }
      })
    })
  })

  async function wait(millis) {
    return new Promise(resolve => setTimeout(resolve, millis))
  }

  craftBtn.addEventListener("click", async () => {
    openModal("/craft/list", "Vyber si recept na výrobu")
    await wait(100)
    const recipeList = document.querySelectorAll(".item-slots")
    recipeList.forEach(recipe => {
      recipe.addEventListener("click", async (e) => {
        const id = recipe.id.split("-")[1]
        const data = new FormData()
        data.append("item", id)
        const res = await fetch("/craft/set", {
          method: "POST",
          body: data
        })
        const json = await res.json()
        if (json.msg == 'ok') {
          location.reload()
        }
      })
    })
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

  const TIME_MULTIPLIER = 1000 // * 60 * 60

  function isGrowing(growData) {
    if (growData.item.type == 'craft') {
      return growData.elapsed < growData.item.time * TIME_MULTIPLIER
    }
    if (growData.item.type == 'plant') {
      if (!growData.watered) return growData.elapsed < growData.item.time * TIME_MULTIPLIER / 2
      else return growData.elapsed < growData.item.time * TIME_MULTIPLIER
    }
    if (growData.item.type == 'animal') {
      if (!growData.fed) return growData.elapsed < growData.item.time * TIME_MULTIPLIER / 2
      else return growData.elapsed < growData.item.time * TIME_MULTIPLIER
    }
    return growData.elapsed < growData.item.time * TIME_MULTIPLIER
  }

  function isReadyToHarvest(data) {
    return data.elapsed >= data.item.time * TIME_MULTIPLIER
  }

  function isWaiting(data) {
    return data.item.type !== 'craft' && (data.elapsed >= data.item.time * TIME_MULTIPLIER / 2) && (data.item.type == 'plant' ? !data.watered : !data.fed)
  }

  function parseTime(data) {
    let remaining = data.item.time * TIME_MULTIPLIER - data.elapsed
    const hours = Math.floor(remaining / (60 * 60 * 1000))
    remaining %= 60 * 60 * 1000
    const minutes = Math.floor(remaining / (60 * 1000))
    remaining %= 60 * 1000
    const seconds = Math.floor(remaining / 1000)
    return `${hours !== 0 ? hours.toString() + 'h ' : ''}${minutes !== 0 ? minutes.toString() + 'm ' : ''}${seconds !== 0 ? seconds : '0'} s`
  }

  function updateTimer(button, data, type) {
    const typeMap = {
      'plant': 'planting',
      'animal': 'breeding',
      'craft': 'crafting'
    }

    const growData = data[typeMap[type]]
    console.log(button.id, growData)
    const clickHandler = async (e) => {
      if (await updateState(growData)) location.reload()
    }
    button.onclick = clickHandler
    if (growData == undefined) {
      // nothing
      console.log(button.id, 'nothing')
      button.disabled = true
      button.innerText = `Nič sa ${type === 'plant' ? 'nepestuje' : type === 'craft' ? 'nevyrába' : 'nepasie'}`
    } else if (isGrowing(growData) && !isReadyToHarvest(growData)) {
      // growing
      console.log(button.id, 'growing')
      button.disabled = true
      button.innerText = parseTime(growData)
    } else if (isWaiting(growData)) {
      // waiting
      console.log(button.id, 'waiting')
      button.disabled = false
      button.innerText = `${growData.item.type === 'animal' ? 'Nakŕm ' : 'Polej '} ma!`
    } else {
      // ready
      console.log(button.id, 'ready')
      button.disabled = false
      button.innerText = 'Pridaj do inventára'
    }
  }

  async function updateState(growData) {
    const typeMap = {
      'plant': 'watered',
      'animal': 'fed'
    }
    const page = growData[typeMap[growData.item.type]] | growData.item.type == 'craft' ? 'claim' : 'water'
    console.log(`/${growData.item.type}/${page}`)
    const res = await fetch(`/${growData.item.type}/${page}`, { method: 'post' })
    return res.ok && page == 'claim'
  }

  async function updateLoop() {
    const res = await fetch('/update')
    const gameData = await res.json()
    updateTimer(waterBtn, gameData, 'plant')
    updateTimer(feedBtn, gameData, 'animal')
    updateTimer(makeBtn, gameData, 'craft')
  }

  const interval = window.setInterval(updateLoop, 1000)
  updateLoop()
})
