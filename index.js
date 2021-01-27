const Discord = require("discord.js")
const intent_list = new Discord.Intents(["GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS", "GUILD_INVITES", "GUILD_MESSAGE_REACTIONS"])
const client = new Discord.Client({ ws: { intents: intent_list } })
const token = 'NzkyOTM4MjY1NTIyODY0MTM4.X-k_Tg.r0bUETpEmQOY1SUsVrtgwcXv4ms'
const prefix = ','
const PREFIX = ','
const { inspect } = require("util");
const vm = require("vm");
const codeContext =  {};
vm.createContext(codeContext);
const request = require('request')
const moment = require('moment')
const SnakeGame = require('./src/snake-game');
const HangmanGame = require('./src/hangman-game');
const Connect4 = require('./src/connect4');
const Chess = require('./src/chess');
const express = require('express');
const snakeGame = new SnakeGame(client);
const hangman = new HangmanGame(client);
const connect4 = new Connect4(client);
const chess = new Chess(client);



client.on("ready", () => {
  console.log(`${client.guilds.cache.size}개의 서버에서 ${client.user.tag}로 로그인됨`)
}) // 봇이 켜졌을 때 cmd에 로그남기는 것

client.on("message", async(message) => {
  if (message.author.bot) return
  if(!message.content.startsWith(prefix)) return
  if(!message.content.startsWith(prefix) || message.author.bot) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
              const command = args.shift().toLowerCase();
              
            if(command === 'eval') {
                  if(message.author.id === '786089668798054400') {
               const code = args.join(" ");
            const token = client.token.split("").join("[^]{0,2}");
            const rev = client.token.split("").reverse().join("[^]{0,2}");
            const filter = new RegExp(`${token}|${rev}`, "g");
            try {
              let output = eval(code);
              if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
              output = inspect(output, { depth: 0, maxArrayLength: null });
              output = output.replace(filter, "[TOKEN]");
              output = clean(output);
              if (output.length < 1950) {
                let embed = new Discord.MessageEmbed()
    .addField('📥ㅣInput', `\`\`\`${code}\`\`\``)
  .addField('📤ㅣOutput', `\`\`\`js\n${output}\`\`\``)
  message.channel.send(embed)
              } else {
                  message.channel.send(`${output}`, {split:"\n", code:"js"});
              }
            } catch (error) {
              let embed = new Discord.MessageEmbed()
    .addField('📥ㅣInput', `\`\`\`${code}\`\`\``)
  .addField('📤ㅣOutput', `\`\`\`js\n${error}\`\`\``)
  message.channel.send(embed)
           } } else {
            const code = args.join(" ");
            let embed = new Discord.MessageEmbed()
            .addField('📥ㅣInput', `\`\`\`${code}\`\`\``)
            .addField('📤ㅣOutput', `\`\`\`js\nError: This is command for creater\`\`\``)
            message.channel.send(embed)
           }
          
            function clean(text)  {
              return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
             }
            }

  if (message.content == `${prefix}핑`) {
    let embed = new Discord.MessageEmbed()
    .setDescription(`🏓퐁! \`${client.ws.ping}ms\``)
    .setTimestamp()
    message.channel.send(embed)
  } if(message.content == PREFIX + '도움') { 
    let embed = new Discord.MessageEmbed()
    .setTitle("보름달 왕국 전용봇 도움말")
    .setColor('#ffc04a')
    .addField('관리', `\`${PREFIX}킥\`, \`${PREFIX}밴\`, \`${PREFIX}청소 <숫자>\``)
    .addField('게임', `\`${PREFIX}뱀\`, \`${PREFIX}행맨\`, \`${PREFIX}체스\`, \`${PREFIX}사목\``)
    .addField('경제', `\`${PREFIX}가입\`, \`${PREFIX}돈받기\`, \`${PREFIX}돈\`, \`${PREFIX}도박\`, \`${PREFIX}올인\``)
    //.addField('학습', `\`${PREFIX}배워 <인식할문장>/<반응할문장>\`, \`${PREFIX}잊어 <문장>\``)
    .addField('코로나', `\`${PREFIX}현황\`, \`${PREFIX}현황 <지역>\``)
    .addField('기타', `\`${PREFIX}도움\`, \`${PREFIX}핑\`, \`${PREFIX}주사위\`, \`${PREFIX}투표\``)
    .setTimestamp()
    message.reply(embed)
}  if (!message.guild) return;
  if (message.content.startsWith(`${prefix}킥`)) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`❌ㅣ이 명령어를 사용하기 위해서는 멤버 추방 권한이 필요합니다.`);
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick()
            .then(() => {
              const kick = new Discord.MessageEmbed()
             .setDescription(`✅ㅣ${user.tag} 을(를) 성공적으로 추방하였습니다.`)
             .setColor('#FF8000')
              message.channel.send(kick);
            })
            .catch(err => {
              const kick_err_1 = new Discord.MessageEmbed()
             .setColor('#ff0000')
            .setDescription("❌ㅣ추방할 권한이 없습니다.")
              message.channel.send(kick_err_1);
              console.error(err);
            });
        } else {
          const kick_err_2 = new Discord.MessageEmbed()
         .setColor('#ff0000')
        .setDescription("❌ㅣ추방할 대상이 이 서버에 없습니다.")
          message.channel.send(kick_err_2);
        }
      } else {
        message.reply("❌ㅣ아무도 멘션하지 않았습니다.");
      }
    } if (message.content.startsWith(`${prefix}밴`)) {
    
      if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("❌ㅣ이 명령어를 사용하기 위해서는 멤버 차단 권한이 필요합니다.");
    
        const user = message.mentions.users.first();
    
        if (user) {
    
          const member = message.guild.member(user);
    
          if (member) {
    
            member
    
              .ban()
    
              .then(() => {
    
                
    
                const ban = new Discord.MessageEmbed()
    
               .setDescription(`✅ㅣ${user.tag} 을(를) 성공적으로 차단하였습니다.`)
               .setColor('#FF8000')
    
                message.channel.send(ban);
    
              })
    
              .catch(err => {
    
                
    
                const ban_err_1 = new Discord.MessageEmbed()
    
               .setColor('#ff0000')
    
              .setDescription("❌ㅣ차단할 권한이 없습니다.")
    
                message.channel.send(ban_err_1);
    
                console.error(err);
    
              });
    
          } else {
    
            
    
            const ban_err_2 = new Discord.MessageEmbed()
    
           .setColor('#ff0000')
    
          .setDescription("❌ㅣ차단할 대상이 이 서버에 없습니다.")
    
            message.channel.send(ban_err_2);
    
          }
    
        } else {
    
          message.reply("❌ㅣ아무도 멘션하지 않았습니다.");
        }
    
      
    } 

if (message.content.startsWith(`${PREFIX}청소`)) {
  if (message.channel.type == "dm") {
    return message.reply("dm에서 사용할 수 없는 명령어 입니다.")
  }
  let per = new Discord.MessageEmbed()
  per.setTitle('명령어 실행 실패')
  per.setColor('#FF0000')
  per.addField('\u200b', '명령어 `청소` 실행에 실패하였습니다.\n자신이 권한이 있는지 확인해주세요')
  per.setFooter('이 메세지는 5초후에 삭제됩니다.')
  per.setTimestamp()
  if (message.channel.type != "dm" && !message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(per).then((msg) => msg.delete({ timeout: 5000 }))

  var clearLine = message.content.slice(`${PREFIX}청소 `.length)
  var isNum = !isNaN(clearLine)

  if (isNum && (clearLine <= 0 || 99 < clearLine)) {
    let embed = new Discord.MessageEmbed()
    .setTitle('명령어 실행 실패')
    .setColor('#FF0000')
    .addField('\u200b', '명령어 `청소` 실행에 실패하였습니다.\n 1부터 99개 사이의 숫자만 입력해주세요.')
    .setFooter('이 메세지는 5초후에 삭제됩니다.')
    .setTimestamp()
    message.channel.send(embed).then((msg) => msg.delete({ timeout: 5000 }))
    return
  } else if (!isNum) {
    // c @나긋해 3
    if (message.content.split("<@").length == 2) {
      if (isNaN(message.content.split(" ")[2])) return

      var user = message.content.split(" ")[1].split("<@!")[1].split(">")[0]
      var count = parseInt(message.content.split(" ")[2]) + 1
      let _cnt = 0

      message.channel.messages.fetch().then((collected) => {
        collected.every((msg) => {
          if (msg.author.id == user) {
            msg.delete()
            ++_cnt
          }
          return !(_cnt == count)
        })
      })
    }
  } else {
    message.channel
      .bulkDelete(parseInt(clearLine) + 1)
      .then(() => {
        let embed = new Discord.MessageEmbed()
        .setTitle('명령어 실행 성공')
        .setColor('GREEN')
        .addField('\u200b', '명령어 `청소`가 정상적으로 실행되었습니다.\n' + parseInt(clearLine) + '개의 메세지를 삭제하였습니다.')
        .setFooter('이 메세지는 5초후에 삭제됩니다.')
        .setTimestamp()
        message.channel.send(embed).then((msg) => msg.delete({ timeout: 5000 }))
      })
      .catch(console.error)
  }
} 

if(message.content == PREFIX + '현황') {
  let url = 'https://apiv2.corona-live.com/stats.json'
  request(url, (error, response, body) => {
      let overview = JSON.parse(response.body).overview;
      overview = {
          total_confirmed_person: overview.confirmed[0],
          yesterday_confirmed_person: overview.confirmed[1],
          current_confirmed_person: overview.current[0],
          current_confirmed_person_diff: overview.current[1]
      }
      let korea = new Discord.MessageEmbed()
      korea.setTitle('대한민국 확진자 현황')
      korea.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      korea.setColor('#ffc04a')
      korea.addField('대한민국 총 확진자 수', overview.total_confirmed_person + '명')
      korea.addField('어제 확진자 수', overview.yesterday_confirmed_person + '명')
      korea.addField('현재 확진자 수', overview.current_confirmed_person + '명')
      korea.addField('동시간대 확진자 비교', overview.current_confirmed_person_diff + '명')
      korea.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com)') 
      korea.setTimestamp()
      message.channel.send(korea)
  })
}

if(message.content == PREFIX + '현황 서울') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          seoul_confirmed_person: current[0].cases[0],
          seoul_confirmed_person_diff: current[0].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          seoul_total_confirmed_person: overall[0].cases[0],
          seoul_yesterday_confirmed_person: overall[0].cases[1],
      }
      let seoul = new Discord.MessageEmbed()
      seoul.setTitle('서울특별시 확진자 비교')
      seoul.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      seoul.setColor('#ffc04a')
      seoul.addField('서울특별시 총 확진자 수', overall.seoul_total_confirmed_person + '명')
      seoul.addField('어제 확진자 수', overall.seoul_yesterday_confirmed_person + '명')
      seoul.addField('현재 확진자 수', current.seoul_confirmed_person + '명')
      seoul.addField('동시간대 확진자 비교', current.seoul_confirmed_person_diff + '명')
      seoul.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/0/)')
      seoul.setTimestamp()
      message.channel.send(seoul)
  })
}

if(message.content == PREFIX + '현황 부산') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          busan_confirmed_person: current[1].cases[0],
          busan_confirmed_person_diff: current[1].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          busan_total_confirmed_person: overall[1].cases[0],
          busan_yesterday_confirmed_person: overall[1].cases[1],
      }
      let busan = new Discord.MessageEmbed()
      busan.setTitle('부산광역시 확진자 비교')
      busan.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      busan.setColor('#ffc04a')
      busan.addField('부산광역시 총 확진자 수', overall.busan_total_confirmed_person + '명')
      busan.addField('어제 확진자 수', overall.busan_yesterday_confirmed_person + '명')
      busan.addField('현재 확진자 수', current.busan_confirmed_person + '명')
      busan.addField('동시간대 확진자 비교', current.busan_confirmed_person_diff + '명')
      busan.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/1/)')
      busan.setTimestamp()
      message.channel.send(busan)
  })
}

if(message.content == PREFIX + '현황 인천') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          incheon_confirmed_person: current[2].cases[0],
          incheon_confirmed_person_diff: current[2].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          incheon_total_confirmed_person: overall[2].cases[0],
          incheon_yesterday_confirmed_person: overall[2].cases[1],
      }
      let incheon = new Discord.MessageEmbed()
      incheon.setTitle('인천광역시 확진자 비교')
      incheon.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      incheon.setColor('#ffc04a')
      incheon.addField('인천광역시 총 확진자 수', overall.incheon_total_confirmed_person + '명')
      incheon.addField('어제 확진자 수', overall.incheon_yesterday_confirmed_person + '명')
      incheon.addField('현재 확진자 수', current.incheon_confirmed_person + '명')
      incheon.addField('동시간대 확진자 비교', current.incheon_confirmed_person_diff + '명')
      incheon.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/2/)')
      incheon.setTimestamp()
      message.channel.send(incheon)
  })
}

if(message.content == PREFIX + '현황 대구') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          daegu_confirmed_person: current[3].cases[0],
          daegu_confirmed_person_diff: current[3].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          daegu_total_confirmed_person: overall[3].cases[0],
          daegu_yesterday_confirmed_person: overall[3].cases[1],
      }
      let daegu = new Discord.MessageEmbed()
      daegu.setTitle('대구광역시 확진자 비교')
      daegu.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      daegu.setColor('#ffc04a')
      daegu.addField('대구광역시 총 확진자 수', overall.daegu_total_confirmed_person + '명')
      daegu.addField('어제 확진자 수', overall.daegu_yesterday_confirmed_person + '명')
      daegu.addField('현재 확진자 수', current.daegu_confirmed_person + '명')
      daegu.addField('동시간대 확진자 비교', current.daegu_confirmed_person_diff + '명')
      daegu.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/3/)')
      daegu.setTimestamp()
      message.channel.send(daegu)
  })
}

if(message.content == PREFIX + '현황 광주') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          gwangju_confirmed_person: current[4].cases[0],
          gwangju_confirmed_person_diff: current[4].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          gwangju_total_confirmed_person: overall[4].cases[0],
          gwangju_yesterday_confirmed_person: overall[4].cases[1],
      }
      let gwangju = new Discord.MessageEmbed()
      gwangju.setTitle('광주광역시 확진자 비교')
      gwangju.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      gwangju.setColor('#ffc04a')
      gwangju.addField('광주광역시 총 확진자 수', overall.gwangju_total_confirmed_person + '명')
      gwangju.addField('어제 확진자 수', overall.gwangju_yesterday_confirmed_person + '명')
      gwangju.addField('현재 확진자 수', current.gwangju_confirmed_person + '명')
      gwangju.addField('동시간대 확진자 비교', current.gwangju_confirmed_person_diff + '명')
      gwangju.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/4/)')
      gwangju.setTimestamp()
      message.channel.send(gwangju)
  })
}

if(message.content == PREFIX + '현황 대전') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          daejeon_confirmed_person: current[5].cases[0],
          daejeon_confirmed_person_diff: current[5].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          daejeonu_total_confirmed_person: overall[5].cases[0],
          daejeon_yesterday_confirmed_person: overall[5].cases[1],
      }
      let daejeon = new Discord.MessageEmbed()
      daejeon.setTitle('대전광역시 확진자 비교')
      daejeon.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      daejeon.setColor('#ffc04a')
      daejeon.addField('대전광역시 총 확진자 수', overall.daejeon_total_confirmed_person + '명')
      daejeon.addField('어제 확진자 수', overall.daejeon_yesterday_confirmed_person + '명')
      daejeon.addField('현재 확진자 수', current.daejeon_confirmed_person + '명')
      daejeon.addField('동시간대 확진자 비교', current.daejeon_confirmed_person_diff + '명')
      daejeon.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/5/)')
      daejeon.setTimestamp()
      message.channel.send(daejeon)
  })
}

if(message.content == PREFIX + '현황 울산') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          ulsan_confirmed_person: current[6].cases[0],
          ulsan_confirmed_person_diff: current[6].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          ulsan_total_confirmed_person: overall[6].cases[0],
          ulsan_yesterday_confirmed_person: overall[6].cases[1],
      }
      let ulsan = new Discord.MessageEmbed()
      ulsan.setTitle('울산광역시 확진자 비교')
      ulsan.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      ulsan.setColor(config.coronacolor)
      ulsan.addField('울산광역시 총 확진자 수', overall.ulsan_total_confirmed_person + '명')
      ulsan.addField('어제 확진자 수', overall.ulsan_yesterday_confirmed_person + '명')
      ulsan.addField('현재 확진자 수', current.ulsan_confirmed_person + '명')
      ulsan.addField('동시간대 확진자 비교', current.ulsan_confirmed_person_diff + '명')
      ulsan.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/6/)')
      ulsan.setTimestamp()
      message.channel.send(ulsan)
  })
} 

if(message.content == PREFIX + '현황 세종') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          sejong_confirmed_person: current[7].cases[0],
          sejong_confirmed_person_diff: current[7].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          sejong_total_confirmed_person: overall[7].cases[0],
          sejong_yesterday_confirmed_person: overall[7].cases[1],
      }
      let sejong = new Discord.MessageEmbed()
      sejong.setTitle('세종시 확진자 비교')
      sejong.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      sejong.setColor('#ffc04a')
      sejong.addField('세종시 총 확진자 수', overall.sejong_total_confirmed_person + '명')
      sejong.addField('어제 확진자 수', overall.sejong_yesterday_confirmed_person + '명')
      sejong.addField('현재 확진자 수', current.sejong_confirmed_person + '명')
      sejong.addField('동시간대 확진자 비교', current.sejong_confirmed_person_diff + '명')
      sejong.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/7/)')
      sejong.setTimestamp()
      message.channel.send(sejong)
  })
} 

if(message.content == PREFIX + '현황 경기') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          gyeonggi_confirmed_person: current[8].cases[0],
          gyeonggi_confirmed_person_diff: current[8].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          gyeonggi_total_confirmed_person: overall[8].cases[0],
          gyeonggi_yesterday_confirmed_person: overall[8].cases[1],
      }
      let gyeonggi = new Discord.MessageEmbed()
      gyeonggi.setTitle('경기도 확진자 비교')
      gyeonggi.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      gyeonggi.setColor('#ffc04a')
      gyeonggi.addField('경기도 총 확진자 수', overall.gyeonggi_total_confirmed_person + '명')
      gyeonggi.addField('어제 확진자 수', overall.gyeonggi_yesterday_confirmed_person + '명')
      gyeonggi.addField('현재 확진자 수', current.gyeonggi_confirmed_person + '명')
      gyeonggi.addField('동시간대 확진자 비교', current.gyeonggi_confirmed_person_diff + '명')
      gyeonggi.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/8/)')
      gyeonggi.setTimestamp()
      message.channel.send(gyeonggi)
  })
} 

if(message.content == PREFIX + '현황 강원') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          gangwon_confirmed_person: current[9].cases[0],
          gangwon_confirmed_person_diff: current[9].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          gangwon_total_confirmed_person: overall[9].cases[0],
          gangwon_yesterday_confirmed_person: overall[9].cases[1],
      }
      let gangwon = new Discord.MessageEmbed()
      gangwon.setTitle('강원도 확진자 비교')
      gangwon.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      gangwon.setColor('#ffc04a')
      gangwon.addField('강원도 총 확진자 수', overall.gangwon_total_confirmed_person + '명')
      gangwon.addField('어제 확진자 수', overall.gangwon_yesterday_confirmed_person + '명')
      gangwon.addField('현재 확진자 수', current.gangwon_confirmed_person + '명')
      gangwon.addField('동시간대 확진자 비교', current.gangwon_confirmed_person_diff + '명')
      gangwon.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/9/)')
      gangwon.setTimestamp()
      message.channel.send(gangwon)
  })
}

if(message.content == PREFIX + '현황 충북') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          chungbuk_confirmed_person: current[10].cases[0],
          chungbuk_confirmed_person_diff: current[10].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          chungbuk_total_confirmed_person: overall[10].cases[0],
          chungbuk_yesterday_confirmed_person: overall[10].cases[1],
      }
      let chungbuk = new Discord.MessageEmbed()
      chungbuk.setTitle('충청북도 확진자 비교')
      chungbuk.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      chungbuk.setColor('#ffc04a')
      chungbuk.addField('충청북도 총 확진자 수', overall.chungbuk_total_confirmed_person + '명')
      chungbuk.addField('어제 확진자 수', overall.chungbuk_yesterday_confirmed_person + '명')
      chungbuk.addField('현재 확진자 수', current.chungbuk_confirmed_person + '명')
      chungbuk.addField('동시간대 확진자 비교', current.chungbuk_confirmed_person_diff + '명')
      chungbuk.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/10/)')
      chungbuk.setTimestamp()
      message.channel.send(chungbuk)
  })
} 

if(message.content == PREFIX + '현황 충남') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          chungnam_confirmed_person: current[11].cases[0],
          chungnam_confirmed_person_diff: current[11].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          chungnam_total_confirmed_person: overall[11].cases[0],
          chungnam_yesterday_confirmed_person: overall[11].cases[1],
      }
      let chungnam = new Discord.MessageEmbed()
      chungnam.setTitle('충청남도 확진자 비교')
      chungnam.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      chungnam.setColor('#ffc04a')
      chungnam.addField('충청남도 총 확진자 수', overall.chungnam_total_confirmed_person + '명')
      chungnam.addField('어제 확진자 수', overall.chungnam_yesterday_confirmed_person + '명')
      chungnam.addField('현재 확진자 수', current.chungnam_confirmed_person + '명')
      chungnam.addField('동시간대 확진자 비교', current.chungnam_confirmed_person_diff + '명')
      chungnam.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/11/)')
      chungnam.setTimestamp()
      message.channel.send(chungnam)
  })
} 

if(message.content == PREFIX + '현황 경북') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          gyeongbuk_confirmed_person: current[12].cases[0],
          gyeongbuk_confirmed_person_diff: current[12].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          gyeongbuk_total_confirmed_person: overall[12].cases[0],
          gyeongbuk_yesterday_confirmed_person: overall[12].cases[1],
      }
      let gyeongbuk = new Discord.MessageEmbed()
      gyeongbuk.setTitle('경상북도 확진자 비교')
      gyeongbuk.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      gyeongbuk.setColor('#ffc04a')
      gyeongbuk.addField('경상북도 총 확진자 수', overall.gyeongbuk_total_confirmed_person + '명')
      gyeongbuk.addField('어제 확진자 수', overall.gyeongbuk_yesterday_confirmed_person + '명')
      gyeongbuk.addField('현재 확진자 수', current.gyeongbuk_confirmed_person + '명')
      gyeongbuk.addField('동시간대 확진자 비교', current.gyeongbuk_confirmed_person_diff + '명')
      gyeongbuk.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/12/)')
      gyeongbuk.setTimestamp()
      message.channel.send(gyeongbuk)
  })
} 

if(message.content == PREFIX + '현황 경남') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          gyeongnam_confirmed_person: current[13].cases[0],
          gyeongnam_confirmed_person_diff: current[13].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          gyeongnam_total_confirmed_person: overall[13].cases[0],
          gyeongnam_yesterday_confirmed_person: overall[13].cases[1],
      }
      let gyeongnam = new Discord.MessageEmbed()
      gyeongnam.setTitle('경상남도 확진자 비교')
      gyeongnam.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      gyeongnam.setColor('#ffc04a')
      gyeongnam.addField('경상남도 총 확진자 수', overall.gyeongnam_total_confirmed_person + '명')
      gyeongnam.addField('어제 확진자 수', overall.gyeongnam_yesterday_confirmed_person + '명')
      gyeongnam.addField('현재 확진자 수', current.gyeongnam_confirmed_person + '명')
      gyeongnam.addField('동시간대 확진자 비교', current.gyeongnam_confirmed_person_diff + '명')
      gyeongnam.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/13/)')
      gyeongnam.setTimestamp()
      message.channel.send(gyeongnam)
  })
} 

if(message.content == PREFIX + '현황 전북') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          jeonbuk_confirmed_person: current[14].cases[0],
          jeonbuk_confirmed_person_diff: current[14].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          jeonbuk_total_confirmed_person: overall[14].cases[0],
          jeonbuk_yesterday_confirmed_person: overall[14].cases[1],
      }
      let jeonbuk = new Discord.MessageEmbed()
      jeonbuk.setTitle('전라북도 확진자 비교')
      jeonbuk.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      jeonbuk.setColor('#ffc04a')
      jeonbuk.addField('전라북도 총 확진자 수', overall.jeonbuk_total_confirmed_person + '명')
      jeonbuk.addField('어제 확진자 수', overall.jeonbuk_yesterday_confirmed_person + '명')
      jeonbuk.addField('현재 확진자 수', current.jeonbuk_confirmed_person + '명')
      jeonbuk.addField('동시간대 확진자 비교', current.jeonbuk_confirmed_person_diff + '명')
      jeonbuk.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/14/)')
      jeonbuk.setTimestamp()
      message.channel.send(jeonbuk)
  })
} 

if(message.content == PREFIX + '현황 전남') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          jeonnam_confirmed_person: current[15].cases[0],
          jeonnam_confirmed_person_diff: current[15].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          jeonnam_total_confirmed_person: overall[15].cases[0],
          jeonnam_yesterday_confirmed_person: overall[15].cases[1],
      }
      let jeonnam = new Discord.MessageEmbed()
      jeonnam.setTitle('전라남도 확진자 비교')
      jeonnam.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      jeonnam.setColor('#ffc04a')
      jeonnam.addField('전라남도 총 확진자 수', overall.jeonnam_total_confirmed_person + '명')
      jeonnam.addField('어제 확진자 수', overall.jeonnam_yesterday_confirmed_person + '명')
      jeonnam.addField('현재 확진자 수', current.jeonnam_confirmed_person + '명')
      jeonnam.addField('동시간대 확진자 비교', current.jeonnam_confirmed_person_diff + '명')
      jeonnam.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/15/)')
      jeonnam.setTimestamp()
      message.channel.send(jeonnam)
  })
} 

if(message.content == PREFIX + '현황 제주') {
  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let current = JSON.parse(response.body).current;
      current = {
          jeju_confirmed_person: current[16].cases[0],
          jeju_confirmed_person_diff: current[16].cases[1],
      }
      let overall = JSON.parse(response.body).overall;
      overall = {
          jeju_total_confirmed_person: overall[16].cases[0],
          jeju_yesterday_confirmed_person: overall[16].cases[1],
      }
      let jeju = new Discord.MessageEmbed()
      jeju.setTitle('제주특별자치도 확진자 비교')
      jeju.setDescription('개인이 운영하는 사이트를 기반으로 제작되었습니다. 실제와 다를 수 있습니다.\n코로나19 의심증상이 있으시다면 인근 보건소 방문 부탁드립니다.')
      jeju.setColor('#ffc04a')
      jeju.addField('제주특별자치도 총 확진자 수', overall.jeju_total_confirmed_person + '명')
      jeju.addField('어제 확진자 수', overall.jeju_yesterday_confirmed_person + '명')
      jeju.addField('현재 확진자 수', current.jeju_confirmed_person + '명')
      jeju.addField('동시간대 확진자 비교', current.jeju_confirmed_person_diff + '명')
      jeju.addField('\u200b', '출처 : [코로나 라이브](https://corona-live.com/city/16/)')
      jeju.setTimestamp()
      message.channel.send(jeju)
  })
}

if(message.content == PREFIX + '주사위') {
  const number = [
  ":one:",
  ":two:",
  ":three:",
  ":four:",
  ":five:",
  ":six:",
];
const Response = Math.floor(Math.random() * number.length);
message.channel.send(number[Response])
}
var arg = message.content.substr(prefix.length)
            .toLowerCase()
            .split(" ");


if(message.content.startsWith(",투표")) {
  let args = message.content.split(" ") // ["!투표", "항목1/항목2/항목3", "시간(초)"]
  let list = args[1].split("/") // ["항목1", "항목2", "항목3"]
  let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]
  let tempString = ""
  let temp = 0
  if(!args) message.reply("`,투표 [항목1/항목2/항목3] 시간(1초 이상)` 이 올바른 명령어 입니다.")
  if(!args[2] || args[2] < 1) message.reply("`!투표 [항목1/항목2/항목3] 시간(1초 이상)` 이 올바른 명령어 입니다.")
  if(list > 5) message.reply("항목은 최대 5개까지 가능합니다.")
  let embed = new Discord.MessageEmbed()
  embed.setTitle(`${message.member.displayName}님의 투표`)
      for(let i=0; i<list.length; i++) {
          temp += 1
          tempString += `**${temp}. ${list[i]}**\n`
      }
  embed.setDescription(tempString)
  embed.setFooter(`투표시간: ${args[2]}초`)
  console.log('전송')
  message.channel.send({ embed: embed }).then(msg => {
      for(let i=0; i<list.length; i++) {
          msg.react(emojis[i])
      }
      setTimeout(function() {
          msg.edit(`<@!${message.author.id}> 투표가 종료되었습니다.`, { embed: embed })
          console.log('종료')
      }, parseInt(args[2])*1000)
  })
}

if(arg[0] == '문의' && message.channel.type == 'dm') {
  let embed = new Discord.MessageEmbed()
  .setTitle('문의완료!').setColor('GREEN').setDescription('이 내용은 관리자 전용 채팅방으로 자동 전송됩니다.\n답변은 개인DM으로 발송 예정이므로 DM차단을 풀어주시길 바라겠습니다.').addField(`문의 내용`, message.content).setFooter(client.user.tag, client.user.avatarURL({dynamic: true})).setTimestamp()
  message.channel.send('.')
  message.channel.send(embed)
}
})





client.login(token)


client.on('messageDelete', async(message) => { // 메세지 삭제 시 로그
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let img = message.author.avatarURL({dynamic: true})
  let embed = new Discord.MessageEmbed()
  embed.setAuthor(message.author.tag, img)
  embed.setColor('#ffc04a')
  embed.setDescription(`<#${message.channel.id}> 에서 메세지가 삭제됨`)
  embed.addField('내용', message.content)
  embed.addField('아이디', `\`\`\`js\nUSER = ${message.author.id}\nCHANNEL = ${message.channel.id}\n\`\`\``)
  embed.addField('시간', `${date} ${time}`)
  embed.setFooter('보름달 왕국#8822', n)
  const deletelogchannel = message.guild.channels.cache.find((channel) => channel.name == '메세지로그')
  if(!deletelogchannel) return
  if(message.author.bot) return
  deletelogchannel.send(embed)
})

client.on('messageUpdate', async(oldMessage, newMessage) => { // 메세지 수정 시 로그
  if(newMessage.author.bot) return
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let img = oldMessage.author.avatarURL({dynamic: true})
  let embed = new Discord.MessageEmbed()
  embed.setAuthor(oldMessage.author.tag, img)
  embed.setColor('#ffc04a')
  embed.setDescription(`<#${oldMessage.channel.id}> 에서 메세지가 수정됨`)
  embed.addField('수정 후', newMessage.content)
  embed.addField('수정 전', oldMessage.content)
  embed.addField('아이디', `\`\`\`js\nUSER = ${oldMessage.author.id}\nCHANNEL = ${oldMessage.channel.id}\n\`\`\``)
  embed.addField('시간', date + ' ' + time)
  embed.setFooter('보름달 왕국#8822', n)
  const editlogchannel = oldMessage.guild.channels.cache.find((channel) => channel.name == '메세지로그')
  if(!editlogchannel) return
  if(oldMessage.author.bot) return
  editlogchannel.send(embed)
})


/*--------------------------------channellog--------------------------------*/

client.on('channelCreate', async(channel) => { // 채널 생성 시 로그
  if(channel.type == 'text') {
      var channeltype = '채팅 채널';
  } else if(channel.type == 'voice') {
      var channeltype = '음성 채널';
  } else if(channel.type == 'category') {
      var channeltype = '카테고리';
  }
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let embed = new Discord.MessageEmbed()
  embed.setColor('#ffc04a')
  embed.setDescription(`<#${channel.id}> 채널이 생성되었습니다.`)
  embed.addField('채널 이름', channel.name)
  embed.addField('채널 종류', channeltype)
  embed.addField('아이디', `\`\`\`js\nCHANNEL = ${channel.id}\n\`\`\``)
  embed.addField('시간', `${date} ${time}`)
  embed.setFooter('보름달 왕국#8822', n)
  const channelcreatelogchannel = channel.guild.channels.cache.find((channel) => channel.name == '채널로그')
  if(!channelcreatelogchannel) return
  channelcreatelogchannel.send(embed)
})

client.on('channelDelete', async(channel) => { // 채널 삭제 시 로그
  if(channel.type == 'text') {
      var channeltype = '채팅 채널'
  } else if(channel.type == 'voice') {
      var channeltype = '음성 채널'
  } else if(channel.type == 'category') {
      var channeltype = '카테고리'
  }
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let embed = new Discord.MessageEmbed()
  embed.setColor('#ffc04a')
  embed.setDescription(`**#${channel.name}** 채널이 삭제되었습니다.`)
  embed.addField('채널 이름', channel.name)
  embed.addField('채널 종류', channeltype)
  embed.addField('아이디', `\`\`\`js\nCHANNEL = ${channel.id}\n\`\`\``)
  embed.addField('시간', `${date} ${time}`)
  embed.setFooter('보름달 왕국#8822', n)
  const channeldeletelogchannel = channel.guild.channels.cache.find((channel) => channel.name == '채널로그')
  if(!channeldeletelogchannel) return
  channeldeletelogchannel.send(embed)
})

client.on('channelUpdate', async(oldChannel, newChannel) => { // 채널 수정 시 로그
  if(oldChannel.type == 'text') {
      var channeltype = '채팅 채널'
  } else if(oldChannel.type == 'voice') {
      var channeltype = '음성 채널'
  } else if(oldChannel.type == 'category') {
      var channeltype = '카테고리'
  } 
  if(oldChannel.name !== newChannel.name) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`<#${newChannel.id}> 채널 이름이 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('변경 후', newChannel.name)
      embed.addField('변경 전', oldChannel.name)
      embed.addField('채널 종류', channeltype)
      embed.addField('아이디', `\`\`\`js\nGUILD = ${oldChannel.guild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter('보름달 왕국#8822', n)
      const logchannel = newChannel.guild.channels.cache.find((channel) => channel.name == '채널로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldChannel.nsfw !== newChannel.nsfw) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`<#${newChannel.id}> 채널 연령설정이 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('변경 후', newChannel.nsfw)
      embed.addField('변경 전', oldChannel.nsfw)
      embed.addField('채널 종류', channeltype)
      embed.addField('아이디', `\`\`\`js\nGUILD = ${oldChannel.guild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter('보름달 왕국#8822', n)
      const logchannel = newChannel.guild.channels.cache.find((channel) => channel.name == '채널로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldChannel.parentID !== newChannel.parentID) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`<#${newChannel.id}> 채널의 카테고리가 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('변경 후', newChannel.parentID)
      embed.addField('변경 전', oldChannel.parentID)
      embed.addField('채널 종류', channeltype)
      embed.addField('아이디', `\`\`\`js\nGUILD = ${oldChannel.guild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter('보름달 왕국#8822', n)
      const logchannel = newChannel.guild.channels.cache.find((channel) => channel.name == '채널로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
})


/*--------------------------------memberlog--------------------------------*/

client.on('guildMemberAdd', async(member) => {
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let img = member.user.avatarURL({dynamic: true})
  let embed = new Discord.MessageEmbed()
  embed.setColor('#ffc04a')
  embed.setTitle(`${member.user.tag}`, img)
  embed.setDescription(`${member.guild.name} 서버에 서버원이 입장하였습니다.`)
  embed.addField('아이디', `\`\`\`js\nMEMBER = ${member.user.id}\nGUILD = ${member.guild.id}\n\`\`\``)
  embed.addField('시간', `${date} ${time}`)
  embed.setFooter('보름달 왕국#8822', n)
  const logchannel = member.guild.channels.cache.find((channel) => channel.name == '멤버로그')
  if(!logchannel) return
  logchannel.send(embed)
})

client.on('guildMemberRemove', async(member) => {
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let img = member.user.avatarURL({dynamic: true})
  let embed = new Discord.MessageEmbed()
  embed.setColor('#ffc04a')
  embed.setTitle(`${member.user.tag}`, img)
  embed.setDescription(`${member.guild.name} 서버에서 서버원이 퇴장했습니다.`)
  embed.addField('아이디', `\`\`\`js\nMEMBER = ${member.user.id}\nGUILD = ${member.guild.id}\n\`\`\``)
  embed.addField('시간', `${date} ${time}`)
  embed.setFooter(client.user.tag, n)
  const logchannel = member.guild.channels.cache.find((channel) => channel.name == '멤버로그')
  if(!logchannel) return
  logchannel.send(embed)
})

client.on('guildMemberUpdate', async(oldMember, newMember) => {
  if(oldMember.nickname !== newMember.nickname) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let img = member.user.avatarURL({dynamic: true})
      let embed = new Discord.MessageEmbed()
      embed.setAuthor(newMember.user.tag, img)
      embed.setColor('#ffc04a')
      embed.setDescription(`<@${oldMember.user.id}> 닉네임이 변경되었습니다.`)
      embed.addField('변경 후', newMember.nickname)
      embed.addField('변경 전', oldMember.nickname)
      embed.addField('아이디', `\`\`\`js\nUSER = ${newMember.user.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = newMember.guild.channels.cache.find((channel) => channel.name == '멤버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
})


/*--------------------------------guildlog--------------------------------*/

client.on('guildUpdate', async(oldguild, newguild) => {
  if(oldguild.name !== newguild.name) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`${newguild.name} 서버 이름이 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', newguild.name)
      embed.addField('수정 전', oldguild.name)
      embed.addField('아이디', `\`\`\`js\nGUILD = ${newguild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldguild.afkChannel.id !== newguild.afkChannel.id) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`${newguild.name} 서버 잠수채널이 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', newguild.afkChannel.name)
      embed.addField('수정 전', oldguild.afkChannel.name)
      embed.addField('아이디', `\`\`\`js\nCHANNEL = ${newguild.afkChannel.id}\nGUILD = ${newguild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldguild.afkTimeout !== newguild.afkTimeout) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`${newguild.name} 잠수 채널 시간이 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', newguild.afkTimeout)
      embed.addField('수정 전', oldguild.afkTimeout)
      embed.addField('아이디', `\`\`\`js\nCHANNEL = ${newguild.afkChannel.id}\nGUILD = ${newguild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldguild.owner !== newguild.owner) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`${newguild.name} 서버장이 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', `<@${newguild.owner.id}>`)
      embed.addField('수정 전', `<@${oldguild.owner.id}>`)
      embed.addField('아이디', `\`\`\`js\nUSER = ${newguild.owner.id}\nGUILD = ${newguild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldguild.premiumTier !== newguild.premiumTier) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`${newguild.name} 서버의 부스트 레벨이 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', newguild.premiumTier)
      embed.addField('수정 전', oldguild.premiumTier)
      embed.addField('아이디', `\`\`\`js\nGUILD = ${newguild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldguild.premiumSubscriptionCount !== newguild.premiumSubscriptionCount) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`${newguild.name} 서버가 부스트되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', newguild.premiumSubscriptionCount)
      embed.addField('수정 전', oldguild.premiumSubscriptionCount)
      embed.addField('아이디', `\`\`\`js\nGUILD = ${newguild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldguild.region !== newguild.region) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`${newguild.name} 서버의 나라가 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', newguild.region)
      embed.addField('수정 전', oldguild.region)
      embed.addField('아이디', `\`\`\`js\nGUILD = ${newguild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldguild.verificationLevel !== newguild.verificationLevel) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`${newguild.name} 서버의 인증정도가 변경되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', newguild.verificationLevel)
      embed.addField('수정 전', oldguild.verificationLevel)
      embed.addField('아이디', `\`\`\`js\nGUILD = ${newguild.id}\n\`\`\``)
      embed.addField('시간', `${date} ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
})

client.on('inviteCreate', async(invite) => {
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let img = member.user.avatar ? `https://cdn.discordapp.com/avatars/${invite.inviter.id}/${invite.inviter.avatar}.webp?size=256` : undefined;
  let embed = new Discord.MessageEmbed()
  embed.setAuthor(invite.inviter.tag, img)
  embed.setColor('#ffc04a')
  embed.setDescription('서버의 초대코드가 생성되었습니다.')
  embed.addField('초대링크', invite.url)
  embed.addField('유효기간', invite.maxAge)
  embed.addField('최대사용자', invite.maxUses)
  embed.addField('아이디', `\`\`\`js\nUSER = ${invite.inviter.id}\nGUILD = ${invite.guild.id}\n\`\`\``)
  embed.addField('시간', `${date} ${time}`)
  embed.setFooter(client.user.tag, n)
  const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
  if(!logchannel) return
  logchannel.send(embed)
})

client.on('inviteDelete', async(invite) => {
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let embed = new Discord.MessageEmbed()
  embed.setColor('#ffc04a')
  embed.setDescription('서버의 초대코드가 삭제되었습니다.')
  embed.addField('초대링크', invite.url)
  embed.addField('아이디', `\`\`\`js\nUSER = ${invite.inviter.id}\nGUILD = ${invite.guild.id}\n\`\`\``)
  embed.addField('시간', `${date} ${time}`)
  embed.setFooter(client.user.tag, n)
  const logchannel = invite.guild.channels.cache.find((channel) => channel.name == '서버로그')
  if(!logchannel) return
  logchannel.send(embed)
})

client.on('roleCreate', async(role) => {
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let embed = new Discord.MessageEmbed()
  embed.setDescription(`<@&${role.id}> 역할이 생성되었습니다.`)
  embed.setColor('#ffc04a')
  embed.addField('역할', `<@&${role.id}>`)
  embed.addField('아이디', `\`\`\`js\nROLE = ${role.id}\nGUILD = ${role.guild.id}\n\`\`\``)
  embed.addField('시간', `${date} ${time}`)
  embed.setFooter(client.user.tag, n)
  const logchannel = role.guild.channels.cache.find((channel) => channel.name == '서버로그')
  if(!logchannel) return
  logchannel.send(embed)
})

client.on('roleDelete', async(role) => {
  var date = moment().format('YYYY년 MM월 DD일')
  var time = moment().format('HH시 mm분 ss초')
  let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
  let embed = new Discord.MessageEmbed()
  embed.setDescription(`${role.name} 역할이 삭제되었습니다.`)
  embed.setColor('#ffc04a')
  embed.addField('역할', role.name)
  embed.addField('아이디', `\`\`\`js\nROLE = ${role.id}\nGUILD = ${role.guild.id}\n\`\`\``)
  embed.addField('시간', `${date}, ${time}`)
  embed.setFooter(client.user.tag, n)
  const logchannel = role.guild.channels.cache.find((channel) => channel.name == '서버로그')
  if(!logchannel) return
  logchannel.send(embed)
})

client.on('roleUpdate', async(oldrole, newrole) => {
  if(oldrole.name !== newrole.name) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`<@&${role.id}> 역할 이름이 수정되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('역할', `<@&${newrole.id}>`)
      embed.addField('수정 후', `${newrole.name}`)
      embed.addField('수정 전', `${oldrole.name}`)
      embed.addField('아이디', `\`\`\`js\nROLE = ${role.id}\nGUILD = ${role.guild.id}\n\`\`\``)
      embed.addField('시간', `${date}, ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = role.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldrole.hexColor !== newrole.hexColor) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`<@&${role.id}> 역할 색깔이 수정되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('역할', `<@&${newrole.id}>`)
      embed.addField('수정 후', `${newrole.hexColor}`)
      embed.addField('수정 전', `${oldrole.hexColor}`)
      embed.addField('아이디', `\`\`\`js\nROLE = ${role.id}\nGUILD = ${role.guild.id}\n\`\`\``)
      embed.addField('시간', `${date}, ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = role.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
  if(oldrole.permissions !== newrole.permissions) {
      var date = moment().format('YYYY년 MM월 DD일')
      var time = moment().format('HH시 mm분 ss초')
      let n = 'https://cdn.discordapp.com/avatars/792938265522864138/5019087380615bf86c62352940b5dda0.webp'
      let embed = new Discord.MessageEmbed()
      embed.setDescription(`<@&${newrole.id}> 역할 권한이 수정되었습니다.`)
      embed.setColor('#ffc04a')
      embed.addField('수정 후', newrole.permissions)
      embed.addField('수정 전', oldrole.permissions)
      embed.addField('시간', `${date}, ${time}`)
      embed.setFooter(client.user.tag, n)
      const logchannel = role.guild.channels.cache.find((channel) => channel.name == '서버로그')
      if(!logchannel) return
      logchannel.send(embed)
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + '뱀') {
      snakeGame.newGame(msg);
  }
  else if (msg.content.toLowerCase() === prefix + '행맨') {
      hangman.newGame(msg);
  }
  else if (msg.content.toLowerCase() === prefix + '사목') {
      connect4.newGame(msg);
  }
  else if (msg.content.toLowerCase() === prefix + '체스') {
      chess.newGame(msg);
  }
  
  
});

const app = express()
const port = 3030

app.get('/', (req, res) => {
    res.send('<script>window.close();</script>');
    if (req.query.col && req.query.row) {
        minesweeper.makeMove(parseInt(req.query.col), parseInt(req.query.row));
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

// client.on('guildMemberAdd', member => {
  //  var a = '791273935194292267'
  //var b = member.guild.channels.cache.find((x) => x.id == a)
  //b.send(`<@${member.id}> 님, 저희 **보름달왕국**에 오신걸 환영합니다 !!\n\n우선, <#801982149032411188> 에서 , 고정메세지 확인하시고 양식대로 작성해주세요 !\n\n\`\`\`\n이름 / 나이 / 성별 / 경로 / 안내 여부\n\`\`\`\n\`\`\`markdown\n# 만약 안내 여부에서 [ 예 ] 를 선택하셨다면 ,\n\`\`\`\n<#801982149032411188> 에서\n[ <@&> 과 <@&> ] 을 언급해주세요 !\n\n그러면 안내팀 분이 오셔서 안내 해 드릴겁니다 : D`)
//})

//client.on('guildMemberRemove', member => {
 // var c = '791274136432541706'
 // var d = member.guild.channels.cache.find((x) => x.id == c)
//  d.send(`아아 ${member.user.tag} 님은 가셨군요.. 다신 보지 맙시다 ㅎㅎ`)
//})