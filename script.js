// script.js
const recipes = [
  { name: "卵焼き", ingredients: ["卵", "塩", "砂糖"] },
  { name: "オムレツ", ingredients: ["卵", "牛乳", "塩", "胡椒"] },
  { name: "スクランブルエッグ", ingredients: ["卵", "牛乳", "バター"] },
  { name: "目玉焼き", ingredients: ["卵", "油", "塩"] },
  { name: "トマトサラダ", ingredients: ["トマト", "オリーブオイル", "塩"] },
  { name: "ポテトサラダ", ingredients: ["じゃがいも", "マヨネーズ", "塩", "胡椒"] },
  { name: "サンドイッチ", ingredients: ["パン", "卵", "レタス", "ハム"] },
  { name: "フルーツヨーグルト", ingredients: ["ヨーグルト", "バナナ", "はちみつ"] },
  { name: "カプレーゼ", ingredients: ["トマト", "モッツァレラチーズ", "バジル"] },
  { name: "パスタナポリタン", ingredients: ["パスタ", "トマトケチャップ", "玉ねぎ", "ピーマン", "ウインナー"] },
  { name: "チャーハン", ingredients: ["ご飯", "卵", "ネギ", "醤油", "油"] },
  { name: "味噌汁", ingredients: ["味噌", "豆腐", "ネギ", "わかめ"] },
  { name: "野菜炒め", ingredients: ["キャベツ", "人参", "ピーマン", "油", "塩", "醤油"] },
  { name: "焼き魚", ingredients: ["魚", "塩", "油"] },
  { name: "ホットケーキ", ingredients: ["ホットケーキミックス", "卵", "牛乳", "バター"] }
];

document.getElementById("suggestBtn").addEventListener("click", () => {
  const input = document.getElementById("ingredientsInput").value;
  const inputIngredients = input.split(",").map(i => i.trim()).filter(i => i !== "");

  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  // 一部でも材料があるレシピを抽出
  const possibleRecipes = recipes.map(recipe => {
    const missing = recipe.ingredients.filter(ing => !inputIngredients.includes(ing));
    const hasAny = recipe.ingredients.some(ing => inputIngredients.includes(ing));
    if (hasAny) {
      return { name: recipe.name, missing, allIngredients: recipe.ingredients };
    }
    return null;
  }).filter(r => r !== null);

  if (possibleRecipes.length > 0) {
    possibleRecipes.forEach(recipe => {
      const li = document.createElement("li");

      // 材料の色分け
      const ingredientText = recipe.allIngredients.map(ing => {
        if (inputIngredients.includes(ing)) {
          return `<span class="have">${ing}</span>`;
        } else {
          return `<span class="missing">${ing}</span>`;
        }
      }).join(", ");

      if (recipe.missing.length === 0) {
        li.innerHTML = `${recipe.name}（材料は全部揃っています！: ${ingredientText}）`;
      } else {
        li.innerHTML = `${recipe.name}（不足している材料: ${recipe.missing.join(", ")} | 材料一覧: ${ingredientText}）`;
      }
      recipeList.appendChild(li);
    });
  } else {
    // 一つも作れるものがない場合
    const li = document.createElement("li");
    li.textContent = "作れるものはありません。";
    recipeList.appendChild(li);
  }
});
