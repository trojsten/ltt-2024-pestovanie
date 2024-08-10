document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("window");
  const closeBtn = document.getElementById("close");
  const overlay = document.getElementById("overlay");
  const modalContent = document.getElementById("modal-content");
  const modalHeader = document.getElementById("modal-header");
  const inventoryBtn = document.getElementById("inventory-btn");
  const plantBtn = document.getElementById("plant-btn");
  const craftBtn = document.getElementById("craft-btn");
  const waterBtn = document.getElementById("water-btn")
  const feedBtn = document.getElementById("feed-btn")

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

  async function wait(millis) {
    return new Promise(resolve => setTimeout(resolve, millis))
  }

  craftBtn.addEventListener("click", () => {
    openModal("/craft/list", "Vyber si recept na výrobu")
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

  const MILIS_IN_HOUR = 1000 // * 60 * 60

  function isGrowing(growData) {
    if (growData.item.type == 'craft') {
      return growData.elapsed < growData.item.time * MILIS_IN_HOUR
    }
    if (growData.item.type == 'plant') {
      if (!growData.watered) return growData.elapsed < growData.item.time * MILIS_IN_HOUR / 2
      else return growData.elapsed < growData.item.time * MILIS_IN_HOUR
    }
    if (growData.item.type == 'animal') {
      if (!growData.fed) return growData.elapsed < growData.item.time * MILIS_IN_HOUR / 2
      else return growData.elapsed < growData.item.time * MILIS_IN_HOUR
    }
    return growData.elapsed < growData.item.time * MILIS_IN_HOUR
  }

  function isReadyToHarvest(data) {
    return data.elapsed >= data.item.time * MILIS_IN_HOUR
  }

  function isWaiting(data) {
    return (data.elapsed >= data.item.time * MILIS_IN_HOUR / 2) && (data.item.type == 'plant' ? !data.watered : !data.fed)
  }

  function parseTime(data) {
    let remaining = data.item.time * MILIS_IN_HOUR - data.elapsed
    const hours = Math.floor(remaining / (60 * 60 * 1000))
    remaining %= 60 * 60 * 1000
    const minutes = Math.floor(remaining / (60 * 1000))
    remaining %= 60 * 1000
    const seconds = Math.floor(remaining / 1000)
    const minutesString = minutes < 10 ? '0' + minutes.toString() : minutes.toString()
    const secondsString = seconds < 10 ? '0' + seconds.toString() : seconds.toString()
    return `${hours !== 0 ? hours.toString() + 'h ' : ''}${minutesString !== '00' ? minutesString + 'm ' : ''}${secondsString} s`
  }

  function updateTimer(button, data, type) {
    const typeMap = {
      'plant': 'planting',
      'animal': 'breeding',
      'craft': 'crafting'
    }

    const growData = data[typeMap[type]]
    console.log(growData)
    const clickHandler = async (e) => {
      if (await updateState(growData)) location.reload()
    }
    button.onclick = clickHandler
    if (growData == undefined) {
      // nothing
      console.log('nothing')
      button.disabled = true
      button.innerText = `Nič sa ${type === 'plant' ? 'nepestuje' : type === 'craft' ? 'nevyrába' : 'nepasie'}`
    } else if (isGrowing(growData) && !isReadyToHarvest(growData)) {
      // growing
      console.log('growing')
      button.disabled = true
      button.innerText = parseTime(growData)
    } else if (isWaiting(growData)) {
      // waiting
      console.log('waiting')
      button.disabled = false
      button.innerText = `${growData.item.type === 'animal' ? 'Nakŕm ' : 'Polej '} ma!`
    } else {
      // ready
      console.log('ready')
      button.disabled = false
      button.innerText = 'Pridaj do inventára'
    }
  }

  async function updateState(growData) {
    const typeMap = {
      'plant': 'watered',
      'animal': 'fed'
    }
    const page = growData[typeMap[growData.item.type]] ? 'claim' : 'water'
    console.log(`/${growData.item.type}/${page}`)
    const res = await fetch(`/${growData.item.type}/${page}`, { method: 'post' })
    console.log(await res.json())
    return res.ok && page == 'claim'
  }

  async function updateLoop() {
    const res = await fetch('/update')
    const gameData = await res.json()
    updateTimer(waterBtn, gameData, 'plant')
    updateTimer(feedBtn, gameData, 'animal')
  }

  const interval = window.setInterval(updateLoop, 1000)
  updateLoop()
})
