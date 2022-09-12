import axios from 'axios'

async function getGroupMembers(){
  const result = await axios.get("./assets/data.json").then(res=>res.data);

	/*jsondaki verileri result'a aktardıktan sonra group bilgisine göre gruplamak için
	* dataları reduce ile döndük.
	*/
  let data = result.reduce((newData, { group: group,assistant, ...value }) => {
				/*reduce' un döneceği newData değeri içerisinde destructuring ile aldığımız verilerden group bilgisi
				 var mı  diye kontrol ediyoruz. Eğer yoksa bu değeri reduce ile döneceğimiz objeye pushluyoruz.
				 */
        var temp = newData.find(o => o.group === group);
        if (!temp) 
					newData.push(temp = { group, student: [],assistant });
				/*Buraya destructuring ile gelen veri her işlem sonunda bir sonraki veriye geçerek devam eder
				/Yukarıda reduce ile dönecek olan newData içerisinde önceden olan bir group varsa
				bunu sadece student kısmına pushluyoruz çünkü bu group bilgisi zaten 
				eklenmiş ve bu kişi o grupta bulunan bir öğrenci
				*/
				/*Burada ise type bilgisi boş değilse bu kişinin assistant kısmına eklenmesi gerekiyor.
				Eğer type bilgisi boş ise bu verinin student kısmına eklenir.
				*/
        if(value.type!=null){
          temp.assistant =value.name;
        }else{
					temp.student.push(value.name);
				}
				// gelen veriler bitene kadar buradaki döngü devam eder.
        return newData;
    }, []);
		console.log(data);
		return data;
}


async function getFilterGroup(value){
	//getGroupMembers() function'ını çağırıp içerisinden dönen gruplanmış veriyi kullanarak filtreleme işlemi yapıldı.
	let result = await getGroupMembers().then(data=>data);
	if(value)
		console.log(result.filter(x=>x.group==value))
}

getGroupMembers(); //Bu function'ı çağırmadan da tüm gruplanmış verileri getFilterGroup() ile console.log() 'a yazdırabiliriz.

getFilterGroup("Orchid");
