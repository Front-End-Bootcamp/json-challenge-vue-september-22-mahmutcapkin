import axios from 'axios'

async function getGroupMembers(){
  const result = await axios.get("./assets/data.json").then(res=>res.data);

  let data = result.reduce((r, { group: group,assistant, ...value }) => {
        var temp = r.find(o => o.group === group);
        if (!temp) 
          r.push(temp = { group, student: [],assistant });
        temp.student.push(value.name);
        if(value.type!=null){
          temp.assistant =value.name;
        }
        return r;
    }, []);
		console.log(data);
		return data;
}


async function getFilterGroup(value){
	let result = await getGroupMembers().then(data=>data);
	if(value)
		console.log(result.filter(x=>x.group==value))
	
}

getGroupMembers();
getFilterGroup("Orchid");
