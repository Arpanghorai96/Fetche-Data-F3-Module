async function fetchData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    data.forEach(coin => {
      const row = document.createElement('tr');
     
      row.innerHTML = `
        <td><img src="${coin.image}" alt="">${coin.name}</td>
        <td>${coin.symbol}</td>
        <td>$ ${coin.current_price}</td>
        <td>$ ${coin.total_volume}</td>
        <td>${coin.price_change_percentage_24h} %</td>
        <td>$ ${coin.market_cap}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = responseData.filter(coin =>
      coin.name.toLowerCase().includes(searchInput) ||
      coin.id.toLowerCase().includes(searchInput) ||
      coin.symbol.toLowerCase().includes(searchInput)
    );
    renderTable(filteredData);
  }

  function sortData(key) {
    const sortedData = [...responseData].sort((a, b) => {
      if (key === 'marketCap') {
        return b.market_cap - a.market_cap;
      } else if (key === 'priceChange') {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
    });
    renderTable(sortedData);
  }

  let responseData;

  fetchData().then(data => {
    responseData = data;
    renderTable(data);
  });

  