logoutBtn.addEventListener("click", () => {
      console.log("logout");
      fetch("http://localhost:3000/logout");
    });
    headerSearch2.addEventListener("click", () => {
      console.log("headerSearch2 clicked", headerInput2.value);
      if (nodesFruits.varietiesData[headerInput2.value]) {
        displayName(nodesFruits, headerInput2.value, "fruits");
      } else if (nodesVegetables.varietiesData[headerInput2.value]) {
        displayName(nodesVegetables, headerInput2.value, "vegetables");
      } else if (nodesOthers.varietiesData[headerInput2.value]) {
        displayName(nodesOthers, headerInput2.value, "others");
      } else {
        displayError();
      }
    });
    headerSearch.addEventListener("click", () => {
      console.log("headerSearch2 clicked", headerInput2.value);
      if (nodesFruits.namesData[headerInput.value]) {
        displaySub(nodesFruits, headerInput.value);
      } else if (nodesVegetables.namesData[headerInput.value]) {
        displaySub(nodesVegetables, headerInput.value);
      } else if (nodesOthers.namesData[headerInput.value]) {
        displaySub(nodesOthers, headerInput.value);
      } else {
        displayError();
      }
    });

    exportPNG.addEventListener("click", () => {
      let link = document.createElement("a");
      link.href = cy.png();
      link.download = "image_filename.png";
      link.click();
    });
    
    exportPNG.addEventListener("click", () => {
      let link = document.createElement("a");
      link.href = cy.jpg();
      link.download = "image_filename.jpg";
      link.click();
    });
    
    exportJSON.addEventListener("click", () => {
      let link = document.createElement("a");
      link.href = cy.json();
      link.download = "image_filename.json";
      link.click();
    });
    
    compassUp.addEventListener("click", () => {
      var currentX = cy.pan().x;
      var currentY = cy.pan().y;
      cy.pan({ x: currentX, y: currentY - 20 });
    });
    compassDown.addEventListener("click", () => {
      var currentX = cy.pan().x;
      var currentY = cy.pan().y;
      cy.pan({ x: currentX, y: currentY + 20 });
    });
    compassLeft.addEventListener("click", () => {
      var currentX = cy.pan().x;
      var currentY = cy.pan().y;
      cy.pan({ x: currentX - 20, y: currentY });
    });
    compassRight.addEventListener("click", () => {
      var currentX = cy.pan().x;
      var currentY = cy.pan().y;
      cy.pan({ x: currentX + 20, y: currentY });
    });
    