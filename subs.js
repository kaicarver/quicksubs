/* add subtitles to any HTML page.
Insert into any page using bookmarklet like this:
javascript:(function(s){s.src='http://127.0.0.1:8887/cygwin64/home/kai/github/quicksubs/subs.js?'+Math.random();document.body.appendChild(s)})(document.createElement('script'))
*/
var subtitles;
//var subtitles = prompt("Subtitles (get from view source of URL for episode)", "http://transcripts.foreverdreaming.org/viewforum.php?f=159&start=200");
var dialog = document.createElement('dialog');
var adhoc;
var curLine = 0;
var lines = [];
var box;
dialog.innerHTML = 'Subtitles in <a href="https://matroska.org/technical/specs/subtitles/srt.html" target="_blank">SubRip format</a> or <a href="http://transcripts.foreverdreaming.org/viewforum.php?f=159&start=200" target="_blank">lines</a>:<br><textarea id="text"></textarea><br><button id="ok">OK</button><button id="cancel">Cancel</button>';
document.body.appendChild(dialog);
document.querySelector('#ok').onclick = function() {
  document.querySelector('dialog').close(document.querySelector('#text').value);
};
document.querySelector('#cancel').onclick = function() {
  document.querySelector('dialog').close();
};
dialog.addEventListener('close', function() {
  subtitles = this.returnValue;
  if (subtitles == '') {
    subtitles = getSubtitles();
  }
  showSubtitles(subtitles);
});
dialog.showModal();

function showSubtitles(subtitles) {
  // ad hoc format: instead of SubRip .srt format, Big Bang Theory scripts, one subtitle per line, surrounded by p tags
  // for now anything that starts with 0 is SubRip format
  adhoc = !/^\s*\d+\s+\d\d:\d\d:\d\d,\d\d\d\s+/.test(subtitles);
  var subsep = "\n\n";
  if (adhoc) {
    subsep = "\n";
  }
  lines = subtitles.split(subsep);
  box = document.createElement('div');
  box.id="box";
  box.style.position = 'fixed';
  box.style.left = 0;
  box.style.right = 0;
  box.style.marginLeft = 'auto';
  box.style.marginRight = 'auto';
  box.style.backgroundColor = 'rgba(253,245,230,0.7)';
  box.style.color = 'black';
  box.style.fontSize = '1.5em';
  box.style.fontFamily = 'Arial';
  box.style.textAlign = 'center';
  box.style.bottom = 0;
  box.style.zIndex = 150;
  document.body.appendChild(box);
  nextLine(0);
  document.onkeydown = function() {
    switch (window.event.keyCode) {
    case 37: nextLine(-1); return false;; // ← Left key
    case 38: nextLine(-1); return false;; // ↑ Up key
    case 13: nextLine(0);  return false;; // ↵ Enter key
    case 39: nextLine(1);  return false;; // → Right key
    case 40: nextLine(1);  return false;; // ↓ Down key
    }
    return true;
  }
}
function nextLine(pos) {
  var box = document.getElementById("box");
  if (curLine + pos < 0 || curLine + pos >= lines.length) {
    return;
  }
  curLine += pos;
  var line = lines[curLine];
  if (adhoc) {
    line = lines[curLine].replace(/<.*?>/g, '');
  } else {
    var regexp = /^\s*(\d+)\s+(\d+:\d+:\d+,\d+).*?(\d+:\d+:\d+,\d+)\s+([\s\S]+)/;
    var match = regexp.exec(line);
    var title = (curLine + 1) + ' / ' + lines.length + "\n" + match[2] + ' - ' + match[3];
    var text = match[4];
    text = text.replace(/\n/g, '<br>');
    line = '<span title="' + title + '">' + text + '</span>';
  }
  box.innerHTML = line;
}

function multiline(f) {
  return f.toString().split('\n').slice(1, -1).join('\n');
}

// can use ad hoc text from view source of http://transcripts.foreverdreaming.org/viewtopic.php?f=159&t=22987
function getSubtitles() {
  return multiline(function(){/* 
0
00:00:01,000 --> 00:00:04,000
Downloaded From www.AllSubs.org

1
00:01:23,959 --> 00:01:26,502
KAMATARI FUJlwARA
DAISUKE KATO

2
00:01:26,670 --> 00:01:30,047
ISAO KIMURA, MINORU CHIAKI
SEIJI MIYAGUCHI

3
00:01:30,257 --> 00:01:36,095
BOKUZEN HIDARI
YOSHIO INABA, YOSHIO TSUCHIYA

4
00:03:02,683 --> 00:03:07,812
Directed by
AKIRA KUROSAwA

5
00:03:13,485 --> 00:03:15,444
During the Civil wars,

6
00:03:15,612 --> 00:03:20,283
an endless cycle of conflict
left the countryside overrun by bandits.

7
00:03:20,450 --> 00:03:24,579
Peaceable folk lived in terror
of the thunder of approaching hooves...

8
00:04:08,498 --> 00:04:11,709
Take this village too?

9
00:04:11,877 --> 00:04:14,587
Take it! Take it!

10
00:04:15,464 --> 00:04:16,923
Not so fast!

11
00:04:17,090 --> 00:04:21,093
we just took their rice last fall.

12
00:04:21,678 --> 00:04:23,179
They'll have nothing now.

13
00:04:23,639 --> 00:04:25,139
Very well.

14
00:04:25,307 --> 00:04:28,142
we'll return
when that barley's ripe!

15
00:05:00,676 --> 00:05:03,469
Is there no god to protect us?

16
00:05:05,180 --> 00:05:10,851
Land tax, forced labor,
war, drought...

17
00:05:11,478 --> 00:05:14,230
and now bandits!

18
00:05:18,610 --> 00:05:22,321
The gods want us farmers dead!

19
00:05:22,489 --> 00:05:25,241
That's right!
we're better off dead!

20
00:05:26,785 --> 00:05:31,163
what's all this?
Crying won't change anything.

21
00:05:31,581 --> 00:05:34,500
The magistrate can do more
than collect taxes.

22
00:05:34,668 --> 00:05:36,502
we can ask him for help.

23
00:05:37,462 --> 00:05:39,505
we know all about him!

24
00:05:39,673 --> 00:05:43,009
He shows up after they're gone,
acting big while he surveys the damage.

25
00:05:43,176 --> 00:05:45,344
That's right. He's useless.

26
00:05:45,512 --> 00:05:50,808
we might as well hand over
our rice and barley to the bandits

27
00:05:50,976 --> 00:05:53,269
and just hang ourselves!

28
00:05:53,770 --> 00:05:57,189
That'll bring the magistrate
here in a hurry!

29
00:06:07,784 --> 00:06:09,493
we'll kill those bandits.

30
00:06:10,704 --> 00:06:12,538
we'll kill them all.

31
00:06:12,706 --> 00:06:14,749
Never again!
Let's kill 'em all!

32
00:06:15,500 --> 00:06:17,043
Not me!

33
00:06:18,545 --> 00:06:20,880
I couldn't possibly -

34
00:06:22,966 --> 00:06:24,967
That's crazy talk.

35
00:06:26,887 --> 00:06:30,222
So we can kill defeated samurai
but not bandits?

36
00:06:30,807 --> 00:06:34,185
Stop it! This is no time
to fight amongst ourselves.

37
00:06:37,230 --> 00:06:41,358
we don't have a chance against bandits.
And when we lose?

38
00:06:41,526 --> 00:06:44,904
They'll slaughter us all,
down to the last unborn child.

39
00:06:45,072 --> 00:06:48,532
I've had enough!
Better to risk it all

40
00:06:48,700 --> 00:06:51,410
than to live like this.
Kill or be killed!

41
00:06:51,578 --> 00:06:53,037
Rikichi!

42
00:06:53,413 --> 00:06:56,248
The farmer's only choice
is to endure.

43
00:06:56,458 --> 00:06:58,542
we can't defy the powerful.

44
00:07:00,212 --> 00:07:03,089
when the bandits arrive,
we'll greet them meekly

45
00:07:03,924 --> 00:07:06,092
and quietly hand over
all our barley.

46
00:07:06,593 --> 00:07:11,138
we'll plead with them to leave
just enough for us to survive.

47
00:07:11,598 --> 00:07:16,769
"That's all we ask,"
we'll beg on our hands and knees.

48
00:07:18,313 --> 00:07:20,648
what bandit will agree to that?

49
00:07:21,024 --> 00:07:26,195
Have you forgotten how low we had
to stoop for the rice we're eating now?

50
00:07:47,634 --> 00:07:49,718
we should go see the Old Man.

51
00:07:49,886 --> 00:07:52,304
Let him decide what to do.

52
00:08:57,871 --> 00:09:00,080
Consider who
we're dealing with here.

53
00:09:01,708 --> 00:09:05,711
Give a wolf a taste of your leg
and he'll ask for your hand.

54
00:09:05,879 --> 00:09:08,714
Once they have a taste,
they'll be back in the fall.

55
00:09:08,882 --> 00:09:12,176
- But what if we lose?
- Then we're no worse off!

56
00:09:12,719 --> 00:09:15,721
without our barley,
we're doomed anyway!

57
00:09:20,852 --> 00:09:22,102
we fight.

58
00:09:23,855 --> 00:09:26,065
Old Man, that's madness.

59
00:09:26,233 --> 00:09:28,692
we're farmers.
what do we know of battle?

60
00:09:28,860 --> 00:09:31,403
we'll hire samurai.

61
00:09:31,738 --> 00:09:35,908
whoever heard of farmers
hiring samurai?

62
00:09:37,494 --> 00:09:40,246
I saw it with my own eyes,

63
00:09:41,248 --> 00:09:46,502
when the village you were born in
was torched.

64
00:09:47,462 --> 00:09:51,715
I saw it when we escaped
to this village here.

65
00:09:52,926 --> 00:09:59,807
The only village that didn't burn
was the one that hired samurai.

66
00:10:00,141 --> 00:10:03,811
But Old Man, there are
different kinds of villages and villagers.

67
00:10:03,979 --> 00:10:06,522
How are we to feed samurai
when we live on rice gruel?

68
00:10:06,690 --> 00:10:07,940
we'll make do on millet!

69
00:10:08,108 --> 00:10:12,444
Show me a samurai who'll fight
for farmers in return for food!

70
00:10:12,612 --> 00:10:14,613
They're a proud lot.

71
00:10:14,781 --> 00:10:15,864
Look.

72
00:10:17,033 --> 00:10:20,786
Find hungry samurai.

73
00:10:22,080 --> 00:10:27,793
Even bears come down from
the mountains when they're hungry.

74
00:11:11,338 --> 00:11:14,048
How dare you?

75
00:11:15,592 --> 00:11:18,969
You're nothing but a farmer!
I'm still a samurai!

76
00:11:19,137 --> 00:11:20,971
I don't need your charity!

77
00:11:24,184 --> 00:11:25,684
Fool!

78
00:11:32,817 --> 00:11:34,610
what'd I tell you?

79
00:12:07,644 --> 00:12:09,645
Look, the barley's ripe.

80
00:12:10,730 --> 00:12:12,815
Ten days already
since we left the village.

81
00:12:12,982 --> 00:12:15,401
what do we do?

82
00:12:17,529 --> 00:12:20,948
This barley's early,
not like our mountain barley.

83
00:12:23,743 --> 00:12:27,371
Hey, we're soaked through
to the bone.

84
00:12:27,539 --> 00:12:31,250
Find any cheap, strong
and foolhardy samurai?

85
00:13:10,290 --> 00:13:12,249
Leftovers.

86
00:13:12,417 --> 00:13:13,876
You can have 'em cheap.

87
00:13:14,043 --> 00:13:15,335
That's a laugh!

88
00:13:16,296 --> 00:13:18,964
- what's so funny?
- He's blind.

89
00:13:20,425 --> 00:13:22,843
- what about you, then?
- Not me.

90
00:13:23,011 --> 00:13:25,387
I'd rather eat horseshit.

91
00:13:29,684 --> 00:13:33,937
- won't get a nose bleed outta him.
- Cleaned him out gambling last night.

92
00:13:34,105 --> 00:13:37,983
Pulled his sword when he lost,
so the three of us beat him up.

93
00:13:38,151 --> 00:13:40,569
Not a drop left in his nose now.

94
00:13:44,824 --> 00:13:47,910
Don't bother.
They only eat millet.

95
00:13:48,411 --> 00:13:51,163
Is that true?
You can't live like that.

96
00:13:51,331 --> 00:13:54,291
without nourishment
you'll go night-blind.

97
00:13:54,542 --> 00:13:56,376
I've got just four left.

98
00:13:56,544 --> 00:13:59,213
I'll trade 'em all
for a cup of rice.

99
00:13:59,506 --> 00:14:01,381
what do you say?

100
00:14:04,177 --> 00:14:06,762
Damn! what a bunch.

101
00:14:25,365 --> 00:14:28,033
what a waste.

102
00:14:28,660 --> 00:14:33,205
If we still had that rice,
we coulda bought 40 of those.

103
00:14:33,373 --> 00:14:34,289
Shut up!

104
00:14:35,208 --> 00:14:37,334
But it's true, right?

105
00:14:39,420 --> 00:14:41,421
The blockhead's cracking up!

106
00:14:42,048 --> 00:14:44,383
what a show.
Go at it, boys.

107
00:14:49,264 --> 00:14:53,934
who ever heard
of anything so unfair?

108
00:14:55,478 --> 00:15:01,358
we give him his fill of rice
and a free bottle of sake,

109
00:15:02,193 --> 00:15:05,529
and he thanks us
with a beating.

110
00:15:06,990 --> 00:15:09,074
Good for him!

111
00:15:09,409 --> 00:15:12,244
Not like this one
playing possum here.

112
00:15:12,537 --> 00:15:17,749
Say, let's go home.
Let's just go home.

113
00:15:19,919 --> 00:15:21,295
Look at him sobbing.

114
00:15:21,462 --> 00:15:23,171
Misses his wifey.

115
00:15:23,339 --> 00:15:26,425
I'd pay good money
to watch the two of 'em going at it.

116
00:15:26,593 --> 00:15:31,221
Let's hurry
and get back to the village.

117
00:15:31,389 --> 00:15:34,891
Go on home. You can't afford buns,
let alone samurai.

118
00:15:35,560 --> 00:15:39,938
Farmers like us know
good from bad when it comes to seed,

119
00:15:40,106 --> 00:15:42,941
but not when it comes
to samurai.

120
00:15:44,569 --> 00:15:48,947
Besides, we're no match
for the tough ones,

121
00:15:49,949 --> 00:15:55,621
and the only ones interested
are weaklings.

122
00:16:03,546 --> 00:16:08,467
If I lost last night,
it was only because I was starving.

123
00:16:09,594 --> 00:16:13,430
Liar! You had plenty
of money to gamble.

124
00:16:14,349 --> 00:16:15,807
Jerk!

125
00:16:15,975 --> 00:16:17,517
wanna fight?

126
00:16:18,978 --> 00:16:20,687
It's a fight.

127
00:16:24,067 --> 00:16:26,485
Over here!
wake up!

128
00:16:36,871 --> 00:16:39,665
Quit that strumming, monk!
It's depressing!

129
00:16:40,500 --> 00:16:43,669
Keep it up, grandpa.
we're on your side.

130
00:17:14,826 --> 00:17:16,326
Rikichi!

131
00:17:17,161 --> 00:17:18,745
Stop it, Manzo!

132
00:17:19,163 --> 00:17:22,207
You said we were going home,
you son of a bitch!

133
00:17:23,084 --> 00:17:26,086
I said we'd go home,
not bargain with bandits!

134
00:17:26,838 --> 00:17:29,423
If we can't hire samurai,
what's left?

135
00:17:29,590 --> 00:17:32,259
It's bargain or nothing!

136
00:17:33,136 --> 00:17:35,846
Fine, have it your way!

137
00:17:44,522 --> 00:17:46,022
But tell me:

138
00:17:46,816 --> 00:17:49,276
If we do strike a bargain,

139
00:17:49,444 --> 00:17:51,737
what have we got
to offer this year?

140
00:17:52,405 --> 00:17:54,740
Are you willing to give 'em
your daughter?

141
00:17:56,617 --> 00:17:58,618
Shino's a fine-lookin' girl.

142
00:19:30,670 --> 00:19:32,337
what's going on?

143
00:19:32,505 --> 00:19:37,467
There's a thief in that barn.
we raised a ruckus and he ran in to hide.

144
00:19:59,615 --> 00:20:01,992
How many thieves are there?

145
00:20:02,159 --> 00:20:03,243
Just one.

146
00:20:03,661 --> 00:20:05,120
One?

147
00:20:06,747 --> 00:20:09,374
All of you can't take
a single thief?

148
00:20:09,542 --> 00:20:14,421
we don't dare make a move.
He took a kid in there with him.

149
00:20:14,589 --> 00:20:17,382
Says he'll kill him
if we attack.

150
00:20:18,467 --> 00:20:21,136
Listen. Hear him?

151
00:20:26,475 --> 00:20:28,602
Poor thing.

152
00:20:28,769 --> 00:20:30,937
It all happened
in the middle of the night.

153
00:20:31,105 --> 00:20:35,400
Poor kid's been bawling
the better part of a day.

154
00:20:35,568 --> 00:20:38,737
He can barely
make a sound now.

155
00:20:41,949 --> 00:20:46,077
He's only seven.
Imagine how his parents feel.

156
00:20:46,245 --> 00:20:49,998
who's that samurai
getting his head shaved?

157
00:20:50,166 --> 00:20:54,544
No idea. we asked him for help
and he agreed right away.

158
00:20:54,712 --> 00:20:56,755
Then he asked us
for two rice balls.

159
00:20:56,923 --> 00:21:01,134
He asked a monk to shave his head
and lend him his robes.

160
00:21:01,302 --> 00:21:02,886
No idea what he's up to.

161
00:22:35,646 --> 00:22:39,649
Stay back!
Any closer and I kill the brat!

162
00:22:39,817 --> 00:22:41,776
I'm a monk.

163
00:22:41,944 --> 00:22:44,112
Stay back!

164
00:22:45,906 --> 00:22:49,534
I'm just a monk.
I mean you no harm.

165
00:22:54,790 --> 00:22:56,291
I won't come in.

166
00:22:56,459 --> 00:23:00,587
I just thought the child
must be very hungry.

167
00:23:05,968 --> 00:23:08,219
I've brought some rice balls.

168
00:23:09,055 --> 00:23:11,222
You should eat one yourself.

169
00:23:13,934 --> 00:23:17,270
won't you have one?

170
00:23:17,646 --> 00:23:18,605
what's wrong?

171
00:23:22,777 --> 00:23:24,527
Throw 'em here!

172
00:23:25,196 --> 00:23:26,362
Here.

173
00:23:54,058 --> 00:23:56,309
My baby!

174
00:25:07,798 --> 00:25:10,508
Even you can't object
to a samurai like that.

175
00:25:10,676 --> 00:25:13,511
Ask him quickly.
It'll be harder in town.

176
00:25:29,695 --> 00:25:31,613
what do you want?

177
00:25:40,539 --> 00:25:44,334
My name is Katsushiro Okamoto.
Please make me your disciple!

178
00:25:47,046 --> 00:25:48,379
Disciple?

179
00:25:48,547 --> 00:25:52,383
As you see, I'm a ronin.
The name is Kambei Shimada.

180
00:25:53,052 --> 00:25:55,261
I don't take on disciples.

181
00:25:55,429 --> 00:25:58,139
Get up.
I can't talk to you like this.

182
00:25:59,350 --> 00:26:01,559
I'm begging you -
let me be your disciple.

183
00:26:01,727 --> 00:26:06,606
First get off your knees.
we'll talk as we go.

184
00:26:18,911 --> 00:26:20,662
I'm at a loss.

185
00:26:20,829 --> 00:26:23,915
You think far too highly of me.

186
00:26:24,083 --> 00:26:24,832
No, sir -

187
00:26:25,000 --> 00:26:26,751
Just hear me out.

188
00:26:26,919 --> 00:26:30,088
There's nothing special
about me.

189
00:26:30,256 --> 00:26:33,549
I may have seen
my share of battle,

190
00:26:33,717 --> 00:26:36,719
but always on the losing side.

191
00:26:36,887 --> 00:26:39,681
That about sums me up.

192
00:26:39,848 --> 00:26:42,934
Better not to follow
such an unlucky man.

193
00:26:43,102 --> 00:26:48,106
No, I'm determined to follow you
whether you allow me to or not.

194
00:26:48,274 --> 00:26:49,899
I forbid it.

195
00:26:50,985 --> 00:26:53,945
I don't have the means
to travel with an attendant.

196
00:27:06,292 --> 00:27:07,917
Can I help you?

197
00:27:16,093 --> 00:27:17,844
what do you want?

198
00:27:26,061 --> 00:27:27,061
Insolence!

199
00:27:28,897 --> 00:27:31,024
Stay out of this, little chick.

200
00:27:34,153 --> 00:27:36,154
Are you a samurai?

201
00:27:40,326 --> 00:27:41,993
Damn right I am!

202
00:27:44,997 --> 00:27:46,748
I wonder.

203
00:27:54,673 --> 00:27:55,965
Bastard.

204
00:28:12,191 --> 00:28:13,858
who was that?

205
00:28:20,157 --> 00:28:21,783
Leave him be.

206
00:28:40,094 --> 00:28:41,969
I beg of you, sir!

207
00:28:43,847 --> 00:28:47,016
You idiot.
why don't you scram?

208
00:28:49,228 --> 00:28:53,147
Stubborn old fool.
They'll eat it and run like last time.

209
00:28:58,070 --> 00:29:00,613
It will never work.

210
00:29:00,781 --> 00:29:04,283
Sir, we could arm the villagers
with bamboo spears.

211
00:29:04,451 --> 00:29:07,078
- I thought of that.
- But, sir -

212
00:29:10,749 --> 00:29:13,167
This isn't a game.

213
00:29:16,588 --> 00:29:19,257
They may be bandits,
but they ride 40 strong.

214
00:29:19,425 --> 00:29:23,094
Two or three samurai
won't suffice.

215
00:29:36,775 --> 00:29:39,944
Defense is more difficult
than offense.

216
00:29:41,905 --> 00:29:44,198
You say there are mountains
behind the village?

217
00:29:44,366 --> 00:29:45,199
Yes.

218
00:29:45,367 --> 00:29:47,118
Passable by horse?

219
00:29:47,286 --> 00:29:48,286
Yes.

220
00:29:57,463 --> 00:29:59,755
Fields in front.

221
00:29:59,923 --> 00:30:02,467
Until those are flooded
with water,

222
00:30:02,801 --> 00:30:05,845
you're open to mounted attack
on four sides.

223
00:30:07,264 --> 00:30:10,016
You need at least four men,
one to guard each side.

224
00:30:11,852 --> 00:30:14,145
Two more to guard the rear.

225
00:30:15,689 --> 00:30:18,483
No matter how frugal
our estimate,

226
00:30:19,318 --> 00:30:21,694
we need seven,
including me.

227
00:30:23,906 --> 00:30:26,199
we can manage
seven somehow.

228
00:30:26,366 --> 00:30:29,118
But the Old Man said four.

229
00:30:29,286 --> 00:30:30,995
It's only three more.

230
00:30:31,455 --> 00:30:33,039
Hold on a second.

231
00:30:33,207 --> 00:30:36,959
I haven't accepted your offer.
I'm only speculating.

232
00:30:37,961 --> 00:30:42,840
First of all, it's not easy
to find trustworthy samurai.

233
00:30:43,217 --> 00:30:48,221
what's more,
all you have to offer is food.

234
00:30:49,556 --> 00:30:53,017
Only those out to fight
for the hell of it will agree.

235
00:30:53,393 --> 00:30:57,730
Besides, I'm sick of fighting.

236
00:30:59,191 --> 00:31:00,858
Age, I suppose.

237
00:31:22,214 --> 00:31:25,299
Good thing
I wasn't born a peasant.

238
00:31:27,052 --> 00:31:30,555
Better to be born a dog.
Goddamn it.

239
00:31:30,889 --> 00:31:34,809
Go ahead - hang yourself and die!
You're better off dead!

240
00:31:34,977 --> 00:31:36,394
Silence, you lout!

241
00:31:36,562 --> 00:31:39,188
what's it to you?
I'm only telling the truth.

242
00:31:39,356 --> 00:31:43,651
what truth? what the hell do you know
of these farmers' suffering?

243
00:31:43,819 --> 00:31:45,444
Don't make me laugh!

244
00:31:45,612 --> 00:31:47,321
Like you would know.

245
00:31:47,489 --> 00:31:48,364
How dare you?

246
00:31:48,532 --> 00:31:51,951
You heard right. If you know,
why don't you help them?

247
00:31:57,457 --> 00:31:59,083
So you wanna fight?

248
00:32:01,503 --> 00:32:02,878
That's enough.

249
00:32:09,177 --> 00:32:11,053
Enough!

250
00:32:18,353 --> 00:32:21,647
Hey, samurai, look at this.

251
00:32:21,815 --> 00:32:23,691
This here's your dinner.

252
00:32:23,859 --> 00:32:26,527
But what do you think
these blockheads eat?

253
00:32:26,695 --> 00:32:27,987
Millet.

254
00:32:28,196 --> 00:32:32,283
They eat millet
to feed you white rice.

255
00:32:32,451 --> 00:32:35,953
This is the best they can offer.
what do you say to that?

256
00:32:37,706 --> 00:32:39,665
- All right, then.
- what?

257
00:32:39,833 --> 00:32:41,292
Quit your jabbering.

258
00:32:46,214 --> 00:32:49,383
I won't let this rice go to waste.

259
00:33:06,443 --> 00:33:08,444
Manzo and the others are back!

260
00:33:23,043 --> 00:33:24,627
where are Rikichi and Yohei?

261
00:33:24,795 --> 00:33:27,505
They stayed behind.
we still need more samurai.

262
00:33:27,673 --> 00:33:29,006
The samurai are coming?

263
00:33:29,174 --> 00:33:31,217
They sure are.
Seven of 'em.

264
00:33:31,385 --> 00:33:32,635
Seven?

265
00:33:36,682 --> 00:33:38,182
Seven.

266
00:33:38,767 --> 00:33:42,978
I was against it
because you said four, Old Man.

267
00:33:44,606 --> 00:33:49,860
I figured we'd need
at least ten.

268
00:33:50,028 --> 00:33:55,116
But if I'd said ten,
we'd have ended up with 15.

269
00:33:56,034 --> 00:33:58,703
That's the way it goes.

270
00:33:59,996 --> 00:34:03,207
Old Man, I'm worried.

271
00:34:07,879 --> 00:34:11,507
The village girls will go crazy
over the samurai.

272
00:34:11,675 --> 00:34:15,886
If the samurai touch 'em,
all hell will break loose.

273
00:34:19,391 --> 00:34:22,393
Bandits are coming, you fool.

274
00:34:23,562 --> 00:34:26,021
Your head is on the block,

275
00:34:26,398 --> 00:34:29,650
and all you think of
are your whiskers?

276
00:34:39,244 --> 00:34:40,453
Samurai, sir.

277
00:34:51,256 --> 00:34:54,925
- You require my services?
- Yes, sir.

278
00:34:55,469 --> 00:34:57,136
who's to be my opponent?

279
00:34:58,305 --> 00:35:00,055
Katsushiro.

280
00:35:12,068 --> 00:35:13,903
Hide just inside the door.

281
00:35:16,573 --> 00:35:18,824
Strike that ronin as he enters.

282
00:35:23,622 --> 00:35:25,331
Here he comes.

283
00:35:30,086 --> 00:35:33,172
Don't hold back.
Give him a real whack.

284
00:36:02,160 --> 00:36:03,786
Excellent!

285
00:36:04,704 --> 00:36:08,833
Please don't take offense.
I am Kambei Shimada.

286
00:36:09,000 --> 00:36:13,462
we're seeking expert swordsmen
and have no time to waste.

287
00:36:13,630 --> 00:36:14,964
Forgive me.

288
00:36:15,632 --> 00:36:16,882
what's this about?

289
00:36:17,759 --> 00:36:19,885
The reason better be good,
or I'll have to redeem my honor.

290
00:36:20,053 --> 00:36:24,557
I humbly beg your pardon.
we only sought to test your skill.

291
00:36:24,724 --> 00:36:28,060
we must soon contend
with a gang of bandits.

292
00:36:28,937 --> 00:36:31,897
I see.
And whose clan do you serve?

293
00:36:32,065 --> 00:36:37,486
It pains me to tell you,
but we're fighting for farmers.

294
00:36:37,654 --> 00:36:39,196
- Farmers?
- That's right.

295
00:36:39,364 --> 00:36:42,825
This job affords
no stipend and no reward.

296
00:36:43,535 --> 00:36:47,079
But we can eat our fill
as long as we fight.

297
00:36:47,330 --> 00:36:48,747
This is absurd!

298
00:36:49,708 --> 00:36:51,876
My ambitions
are greater than that.

299
00:36:53,503 --> 00:36:57,840
That's a shame.
won't you reconsider?

300
00:36:58,717 --> 00:37:00,092
I will not.

301
00:37:06,391 --> 00:37:11,478
Sir, we lost a good man there.
Such a fine swordsman.

302
00:37:57,609 --> 00:37:59,234
what's wrong?

303
00:37:59,402 --> 00:38:03,822
That one samurai's good,
but how'll the other six be?

304
00:38:03,990 --> 00:38:06,116
Enough of your worrying.

305
00:38:06,284 --> 00:38:10,913
How can we know before they get here?
Don't worry till you've seen 'em.

306
00:38:26,137 --> 00:38:28,138
That one there.

307
00:38:46,408 --> 00:38:48,826
Excuse me, samurai, sir.

308
00:38:50,996 --> 00:38:52,871
Just like last time?

309
00:38:56,167 --> 00:38:59,294
Sure.
It's good practice for you.

310
00:39:31,327 --> 00:39:33,370
Surely you jest.

311
00:39:34,372 --> 00:39:35,998
No offense intended.

312
00:39:51,222 --> 00:39:52,765
I'm with you.

313
00:39:55,268 --> 00:39:57,436
But I have to say

314
00:39:57,937 --> 00:40:00,731
that although I understand
the farmers' suffering

315
00:40:01,066 --> 00:40:05,569
and understand
why you would take up their cause,

316
00:40:05,737 --> 00:40:10,657
it's your character
that I find most compelling.

317
00:40:11,576 --> 00:40:16,205
In life one finds friends
in the strangest places.

318
00:40:22,170 --> 00:40:24,797
- what is your name?
- Gorobei Katayama.

319
00:40:24,964 --> 00:40:26,965
A name fit for a giant, no?

320
00:40:37,936 --> 00:40:41,438
Yohei, what are you doing?
Hurry and wash the rice.

321
00:40:45,819 --> 00:40:47,444
Yohei!

322
00:40:51,241 --> 00:40:52,491
what's wrong?

323
00:40:54,244 --> 00:40:57,287
Someone stole the rice.

324
00:41:08,466 --> 00:41:11,593
You idiot!
Didn't I warn you?

325
00:41:11,761 --> 00:41:14,555
I was so careful.

326
00:41:19,227 --> 00:41:23,772
I slept the whole night
hugging that rice jar.

327
00:41:28,862 --> 00:41:30,863
Fine, then!
I'll get more from home!

328
00:41:32,157 --> 00:41:33,657
But what'll we do

329
00:41:33,825 --> 00:41:36,076
till you get back?

330
00:41:36,244 --> 00:41:40,539
There's only a handful left.

331
00:42:33,134 --> 00:42:34,885
Stop that, you idiot!

332
00:42:35,053 --> 00:42:37,846
Hide that money.
The master's returning.

333
00:42:43,269 --> 00:42:46,063
I ran into you
at just the right time.

334
00:42:48,900 --> 00:42:54,988
So you're still alive.
I figured you'd long since left this earth.

335
00:43:01,537 --> 00:43:04,331
Now tell me,
what happened after that?

336
00:43:04,916 --> 00:43:08,085
I hid among the grasses
in the moat until dark.

337
00:43:10,505 --> 00:43:16,385
when the outer walls tumbled down
on me in flames, I knew I was finished.

338
00:43:17,387 --> 00:43:19,846
what ran through your mind
at that moment?

339
00:43:20,723 --> 00:43:23,725
Nothing special.

340
00:43:26,104 --> 00:43:28,855
Sick of fighting yet?

341
00:43:37,657 --> 00:43:43,954
Truth is, there's a tough battle ahead
leading to neither money nor rank.

342
00:43:44,122 --> 00:43:46,498
will you join us?
- Yes.

343
00:43:47,292 --> 00:43:49,543
This may be the one
that kills us.

344
00:44:10,565 --> 00:44:12,441
where are they
when you need 'em?

345
00:44:12,608 --> 00:44:14,735
what do you need, sir?

346
00:44:14,902 --> 00:44:17,154
Samurai.

347
00:44:19,115 --> 00:44:23,327
There's a pretty poor excuse for one
in my backyard.

348
00:44:23,494 --> 00:44:27,164
I couldn't believe his gumption.

349
00:44:27,332 --> 00:44:30,083
He says,
"I'm hungry. Feed me.

350
00:44:30,251 --> 00:44:34,338
I'm broke, though,
so I'll pay you by chopping wood."

351
00:44:39,719 --> 00:44:43,096
I like his frankness.

352
00:45:22,762 --> 00:45:25,722
Never seen a man
split wood before?

353
00:45:25,890 --> 00:45:28,392
Sure, but you do it
with such relish.

354
00:45:28,559 --> 00:45:32,521
It's just my nature.
Sorry if it bothers you.

355
00:45:37,276 --> 00:45:38,610
You're very good.

356
00:45:38,778 --> 00:45:42,155
It's nothing compared
to how I cut down men.

357
00:45:42,323 --> 00:45:45,867
- Have you cut down many?
- That I have.

358
00:45:46,035 --> 00:45:48,745
There's no cutting me off
when I start cutting.

359
00:45:52,041 --> 00:45:55,419
So I make it a point
to run away first.

360
00:45:56,337 --> 00:45:59,005
A most excellent approach.

361
00:45:59,173 --> 00:46:01,383
why, thank you kindly.

362
00:46:08,558 --> 00:46:13,437
Tell me, do you feel like
cutting down 30 bandits?

363
00:46:32,415 --> 00:46:34,040
Let us commence!

364
00:48:05,007 --> 00:48:06,258
Too bad.

365
00:48:06,425 --> 00:48:07,717
It's a draw.

366
00:48:07,885 --> 00:48:09,427
I'm afraid not.

367
00:48:09,595 --> 00:48:10,887
I won.

368
00:48:14,559 --> 00:48:15,642
That's ridiculous!

369
00:48:17,478 --> 00:48:20,146
If these were steel,
you'd be dead now.

370
00:48:25,236 --> 00:48:27,404
- Then we fight with steel!
- Don't throw your life away.

371
00:48:27,572 --> 00:48:28,321
what?

372
00:48:28,489 --> 00:48:31,825
Don't you see?
with steel blades, you'd die.

373
00:48:31,993 --> 00:48:33,451
It's a waste of your life.

374
00:48:33,619 --> 00:48:36,079
wait! Don't try to flee.

375
00:48:39,667 --> 00:48:42,669
Draw! This isn't
a contest of words!

376
00:49:21,125 --> 00:49:22,792
This is preposterous.

377
00:49:24,003 --> 00:49:26,129
There's no contest.

378
00:49:57,870 --> 00:49:59,663
How did you fare?

379
00:50:03,501 --> 00:50:06,670
we let a good fish get away.
An excellent swordsman.

380
00:50:08,005 --> 00:50:10,173
They say the fish that gets away
looks bigger than it really is.

381
00:50:10,341 --> 00:50:11,591
No.

382
00:50:12,635 --> 00:50:16,179
I watched him cut a man down
with my own eyes.

383
00:50:23,187 --> 00:50:24,854
It was amazing.

384
00:50:25,147 --> 00:50:29,275
A man obsessed only
with testing the limits of his skill.

385
00:50:29,860 --> 00:50:31,903
I doubt he'll join us.

386
00:50:32,071 --> 00:50:34,489
- That's a shame.
- Indeed.

387
00:50:35,866 --> 00:50:38,660
I did tell him
where we're staying, though.

388
00:50:38,953 --> 00:50:40,912
And how did you fare?

389
00:50:41,455 --> 00:50:43,289
- Caught one.
- I see.

390
00:50:43,457 --> 00:50:46,918
- As a swordsman, barely mediocre.
- Barely mediocre?

391
00:50:48,379 --> 00:50:51,339
But an honest, amusing man.

392
00:50:51,549 --> 00:50:54,300
Something about him
brightens one's spirits.

393
00:50:54,593 --> 00:50:57,220
He'll be a treasure in hard times.

394
00:50:57,555 --> 00:50:58,930
Much obliged.

395
00:51:01,058 --> 00:51:05,895
Actually, I did land one myself.
- The one dressed as a peddler?

396
00:51:06,063 --> 00:51:07,230
That's right.

397
00:51:07,398 --> 00:51:10,066
In fact, he's an old trusted friend.

398
00:51:15,948 --> 00:51:17,866
I'll bring some water.

399
00:51:21,579 --> 00:51:23,663
I'm Heihachi Hayashida.

400
00:51:23,831 --> 00:51:26,833
A modest warrior
of the wood-Chop School.

401
00:51:32,715 --> 00:51:35,675
Just three more to go.

402
00:51:35,843 --> 00:51:38,261
Three? Don't you mean two?

403
00:51:38,429 --> 00:51:40,847
No, we can't afford
to take a child along.

404
00:51:42,349 --> 00:51:43,308
Master!

405
00:51:43,684 --> 00:51:45,477
I know, I know.

406
00:51:45,895 --> 00:51:48,271
I know what you'll say.

407
00:51:48,439 --> 00:51:52,650
I was once your age, you know.

408
00:51:53,778 --> 00:51:55,779
Hone your skills,

409
00:51:55,988 --> 00:51:59,282
then go to war
and do great things.

410
00:51:59,617 --> 00:52:03,495
Then become lord
of your own castle and domain.

411
00:52:04,413 --> 00:52:09,751
But as you dream those dreams,
before you know it,

412
00:52:09,919 --> 00:52:12,128
your hair will turn
as gray as mine.

413
00:52:13,798 --> 00:52:17,801
By that time

414
00:52:17,968 --> 00:52:21,471
you've lost your parents
and you're all alone.

415
00:53:09,520 --> 00:53:11,688
Tomorrow you go home.

416
00:53:12,022 --> 00:53:14,566
You've learned a lot
these four or five days.

417
00:53:14,733 --> 00:53:16,693
You have
fine stories to tell.

418
00:53:32,543 --> 00:53:36,296
Please, sir.
I beg you to let him come along.

419
00:53:36,463 --> 00:53:39,465
why not let him come?
You call him a kid, but -

420
00:53:39,633 --> 00:53:41,009
Actually,

421
00:53:41,176 --> 00:53:43,428
kids work harder than adults.

422
00:53:44,388 --> 00:53:48,057
But only if you treat them
like adults.

423
00:53:48,642 --> 00:53:52,061
Then let's treat him
like an adult.

424
00:53:57,735 --> 00:54:00,236
That means only two more.

425
00:54:00,404 --> 00:54:03,615
Actually just one, it seems.

426
00:54:10,080 --> 00:54:12,248
You wish to join us?

427
00:54:13,417 --> 00:54:15,376
I'm very grateful.

428
00:54:15,544 --> 00:54:17,587
- when do we depart?
- Tomorrow.

429
00:54:21,383 --> 00:54:22,425
Tomorrow?

430
00:54:24,219 --> 00:54:28,139
This is enough. we don't have time
to find the last one.

431
00:54:30,851 --> 00:54:32,602
All right, then.

432
00:54:35,940 --> 00:54:37,523
Master!

433
00:54:38,400 --> 00:54:40,151
Master!
- All right.

434
00:54:41,195 --> 00:54:44,447
- Master!
- All right! That's enough of that!

435
00:54:49,203 --> 00:54:52,080
Hey, I just found
a real tough samurai.

436
00:54:52,247 --> 00:54:54,624
There was a huge fight.
They were no match for him.

437
00:54:54,792 --> 00:54:57,418
Never seen anything like it.
He's like a wild dog.

438
00:54:57,586 --> 00:55:00,630
Someone stopped the fight.
They started drinking.

439
00:55:00,798 --> 00:55:02,465
I told him about you.

440
00:55:02,633 --> 00:55:04,384
He's on his way.

441
00:55:06,762 --> 00:55:08,763
Shall we give him the usual?

442
00:55:22,736 --> 00:55:24,487
what are you doing?

443
00:55:24,905 --> 00:55:26,614
Testing him.

444
00:55:28,033 --> 00:55:29,659
That's a dirty trick!

445
00:55:29,827 --> 00:55:32,286
Hey, samurai!
- Just shut up and watch.

446
00:55:32,454 --> 00:55:34,497
A true samurai won't get hit.

447
00:55:34,665 --> 00:55:36,374
But this guy's drunk!

448
00:55:36,542 --> 00:55:39,419
A samurai never drinks
enough to dull his wits.

449
00:55:54,518 --> 00:55:56,853
I told you!
You guys are nuts.

450
00:55:58,022 --> 00:55:59,772
what the -

451
00:56:03,652 --> 00:56:06,487
who the hell hit me?

452
00:56:22,171 --> 00:56:23,838
You?

453
00:56:28,886 --> 00:56:32,180
who hit me?

454
00:56:37,978 --> 00:56:39,479
You?

455
00:56:41,982 --> 00:56:44,233
Damn bastard!

456
00:57:12,679 --> 00:57:14,597
You again!

457
00:57:17,184 --> 00:57:20,645
I see that bald head of yours
in my dreams!

458
00:57:23,190 --> 00:57:25,149
Hey, you.

459
00:57:26,026 --> 00:57:28,945
How dare you even ask me
if I'm a samurai!

460
00:57:29,446 --> 00:57:31,489
You got some nerve!

461
00:57:33,367 --> 00:57:35,201
Don't mess with me.

462
00:57:42,042 --> 00:57:45,503
I may look like hell,
but I'm a real samurai!

463
00:57:49,007 --> 00:57:53,469
I've been looking for you
ever since that day.

464
00:57:54,638 --> 00:57:56,764
wanted you to see this.

465
00:58:05,190 --> 00:58:06,816
Look at this!

466
00:58:06,984 --> 00:58:11,988
This is my family tree.
All my ancestors are here.

467
00:58:13,866 --> 00:58:18,161
Damn you, trying to make
a fool outta me. Screw you.

468
00:58:20,038 --> 00:58:21,372
Looky here.

469
00:58:23,000 --> 00:58:24,792
Making a fool outta me.

470
00:58:31,425 --> 00:58:33,718
My honorable self
is right here.

471
00:58:34,678 --> 00:58:37,138
So this Kikuchiyo here
would be you?

472
00:58:37,306 --> 00:58:39,140
That is correct.

473
00:58:39,516 --> 00:58:43,686
"Kikuchiyo,
born February 17, 1574."

474
00:58:45,689 --> 00:58:47,857
what's so damned funny?

475
00:58:49,359 --> 00:58:52,111
You hardly look
13 years old to me.

476
00:58:53,030 --> 00:58:56,991
If you are in fact
the Kikuchiyo listed here,

477
00:58:57,159 --> 00:59:00,036
you'd now be precisely
13 years old.

478
00:59:04,499 --> 00:59:07,293
where'd you steal
this family tree?

479
00:59:07,878 --> 00:59:11,255
Steal it? Shit!

480
00:59:11,882 --> 00:59:13,883
Damn jerks.

481
00:59:14,051 --> 00:59:16,093
To hell with samurai.

482
00:59:17,554 --> 00:59:19,722
To hell with samurai!

483
00:59:22,559 --> 00:59:24,977
Hey, you bastard!

484
00:59:26,396 --> 00:59:29,106
Come back here!

485
00:59:29,274 --> 00:59:32,568
Goddamn it,
you son of a bitch!

486
00:59:42,704 --> 00:59:46,040
what's wrong, teenager?
Here you are.

487
00:59:48,252 --> 00:59:50,419
Damn you!

488
00:59:52,047 --> 00:59:54,006
Come back here!

489
01:00:29,001 --> 01:00:31,002
what's wrong, Lord Kikuchiyo?

490
01:00:35,882 --> 01:00:37,925
what's the matter, junior?

491
01:00:47,477 --> 01:00:50,104
Screw samurai!

492
01:01:06,663 --> 01:01:10,333
- Is he really a samurai?
- In his own mind, anyway.

493
01:01:21,428 --> 01:01:23,387
Take me too!

494
01:01:28,185 --> 01:01:30,728
Hey, Kikuchiyo.

495
01:01:33,357 --> 01:01:35,274
Guard your treasure.

496
01:01:37,110 --> 01:01:40,112
Let me go too!

497
01:02:20,695 --> 01:02:22,863
what is it, Father?

498
01:02:39,423 --> 01:02:41,257
what is it?

499
01:02:42,092 --> 01:02:44,260
what are you staring at?

500
01:02:52,436 --> 01:02:56,021
Shino, cut off your hair.

501
01:02:56,189 --> 01:02:58,816
Cut your hair
and dress like a man.

502
01:03:00,944 --> 01:03:03,487
- what are you talking about?
- Just cut it off!

503
01:03:04,448 --> 01:03:08,451
It's only because I love you.
No telling what those samurai'll do!

504
01:03:08,618 --> 01:03:09,535
No!

505
01:03:09,703 --> 01:03:12,121
No, I won't!

506
01:03:16,460 --> 01:03:17,960
Shino!

507
01:03:42,819 --> 01:03:44,153
He's a fool.

508
01:03:44,321 --> 01:03:47,823
But Manzo knows those samurai
better than anyone.

509
01:03:47,991 --> 01:03:50,117
If he cut off his daughter's hair,
he must have good reason.

510
01:03:50,285 --> 01:03:53,454
You've only got sons,
so you're safe, but we -

511
01:03:53,622 --> 01:03:56,165
Goddamn it!
Now I understand.

512
01:03:56,333 --> 01:04:00,252
So you agree to hide my daughter
at your place across the bridge?

513
01:04:00,420 --> 01:04:03,380
Idiot! I meant that I see
what Manzo's up to.

514
01:04:04,090 --> 01:04:09,803
That rascal doesn't care about the village,
only about his daughter.

515
01:04:10,138 --> 01:04:11,555
Damn him!

516
01:04:30,617 --> 01:04:32,868
Look what you've done!

517
01:04:33,286 --> 01:04:35,371
Now the whole village is crazed.

518
01:04:35,539 --> 01:04:37,831
Every family
with a girl's gone mad.

519
01:04:39,584 --> 01:04:41,710
How do you plan
to set this right?

520
01:04:41,878 --> 01:04:44,672
The samurai will show up
any day now.

521
01:04:45,507 --> 01:04:48,551
Come on.
we're seeing the Old Man.

522
01:04:50,554 --> 01:04:53,597
There's nothing to see here!
Go home!

523
01:04:54,849 --> 01:04:56,267
Go home!

524
01:04:58,061 --> 01:05:01,605
we can't let the samurai
see us like this.

525
01:05:08,363 --> 01:05:10,364
He's still following us.

526
01:06:55,679 --> 01:06:57,721
where did Kikuchiyo go?

527
01:06:58,640 --> 01:07:00,391
Think he gave up?

528
01:07:00,600 --> 01:07:02,393
It's funny.

529
01:07:02,686 --> 01:07:04,812
Now that he's gone,
it's almost a little...

530
01:07:05,188 --> 01:07:06,980
Ionely.

531
01:07:12,862 --> 01:07:14,530
This way.

532
01:07:16,866 --> 01:07:18,784
Oh, hell!

533
01:07:31,715 --> 01:07:34,299
So that's our castle, eh?

534
01:07:35,385 --> 01:07:38,137
No way I'm gonna die
in that dungheap.

535
01:07:38,304 --> 01:07:40,889
No one asked you to.

536
01:07:59,242 --> 01:08:03,162
we're back!
The samurai have arrived!

537
01:08:08,168 --> 01:08:10,210
The samurai are here!

538
01:08:14,841 --> 01:08:18,552
what's wrong with you?
The samurai are here!

539
01:08:24,642 --> 01:08:26,727
Hey, what's wrong?

540
01:08:30,732 --> 01:08:32,566
what's the matter?

541
01:08:46,539 --> 01:08:48,916
This is a fine welcome.

542
01:08:52,504 --> 01:08:54,630
what's the meaning of this?

543
01:08:57,467 --> 01:09:01,470
Hey, what's going on?
The samurai have arrived!

544
01:09:17,529 --> 01:09:19,905
- we'll go see the Old Man.
- The Old Man?

545
01:09:20,073 --> 01:09:23,075
whatever happens in the village,
the Old Man -

546
01:09:23,243 --> 01:09:25,327
He's the village elder?

547
01:09:26,830 --> 01:09:31,333
An audience with the village elder.
This is truly an honor.

548
01:09:35,129 --> 01:09:36,797
well, let's go.

549
01:10:48,786 --> 01:10:54,207
I know they're being foolish.

550
01:10:55,043 --> 01:10:58,462
All farmers ever do is worry,

551
01:10:58,630 --> 01:11:03,508
whether the rain falls,
the sun shines, or the wind blows.

552
01:11:03,801 --> 01:11:05,928
In short,

553
01:11:06,512 --> 01:11:10,098
all they know is fear.

554
01:11:10,433 --> 01:11:14,102
Their behavior today...

555
01:11:15,688 --> 01:11:19,274
is also due simply to fear.

556
01:11:21,945 --> 01:11:27,032
But Old Man,
why do the villagers fear us?

557
01:11:27,951 --> 01:11:31,745
what can they expect from us
under such circumstances?

558
01:12:02,485 --> 01:12:04,194
Samurai, sirs!

559
01:12:04,821 --> 01:12:07,447
Samurai, please!

560
01:12:24,298 --> 01:12:27,551
Quiet down!

561
01:12:28,302 --> 01:12:30,846
Don't panic. Calm down.

562
01:12:31,514 --> 01:12:34,266
I want clear answers.

563
01:12:34,434 --> 01:12:36,768
where are the bandits
coming from?

564
01:12:36,936 --> 01:12:40,230
- The mountains!
- No, the road!

565
01:12:43,484 --> 01:12:46,695
who saw the bandits?
Come forward.

566
01:12:46,904 --> 01:12:49,156
No one saw any bandits?

567
01:12:49,782 --> 01:12:51,867
Then who sounded the alarm?

568
01:12:52,035 --> 01:12:53,326
I did!

569
01:12:59,834 --> 01:13:02,169
Outta the way.

570
01:13:06,758 --> 01:13:09,301
what's with the faces?

571
01:13:10,553 --> 01:13:13,680
Don't worry.
No bandits have come.

572
01:13:18,936 --> 01:13:20,729
Hey, blockheads.

573
01:13:20,897 --> 01:13:24,566
Remember how you welcomed us
when we got here?

574
01:13:24,901 --> 01:13:27,569
But as soon as I bang on this,

575
01:13:27,737 --> 01:13:31,156
"Samurai, sirs!
Samurai, please!"

576
01:13:31,574 --> 01:13:33,867
You're practically groveling!

577
01:13:38,706 --> 01:13:41,374
Got what you deserved,
you mud snails.

578
01:13:59,102 --> 01:14:01,686
Got a problem, gramps?

579
01:14:01,854 --> 01:14:03,188
Nope.

580
01:14:03,606 --> 01:14:05,732
All's well now.

581
01:14:11,322 --> 01:14:14,032
Looks like he's good
for something after all.

582
01:14:14,200 --> 01:14:16,827
There are seven of us at last.

583
01:14:24,001 --> 01:14:26,002
Sorry it's so dirty.

584
01:14:26,170 --> 01:14:30,048
But where will you sleep
if we take your home?

585
01:14:30,299 --> 01:14:33,760
- In the barn.
- with your horse?

586
01:14:35,263 --> 01:14:38,223
The bandits
got my horse last year.

587
01:14:55,533 --> 01:14:59,161
A barn's not so bad
with a wife to snuggle up to.

588
01:15:03,332 --> 01:15:05,667
I don't have a wife!

589
01:15:05,835 --> 01:15:07,544
what's the matter, you fool?

590
01:15:19,140 --> 01:15:20,640
Jerk.

591
01:15:34,197 --> 01:15:36,865
By the way,
what's your real name?

592
01:15:38,743 --> 01:15:40,619
I don't remember.

593
01:15:40,995 --> 01:15:43,371
Give me a new one that fits.

594
01:15:43,831 --> 01:15:46,041
Then Kikuchiyo it is.

595
01:15:47,210 --> 01:15:49,377
Fits you perfectly.

596
01:16:09,690 --> 01:16:12,400
How would you attack
this village?

597
01:16:12,568 --> 01:16:15,153
I'd charge from this mountain.

598
01:16:16,739 --> 01:16:18,907
I agree.
Along this road.

599
01:16:19,408 --> 01:16:21,618
wEST

600
01:16:36,634 --> 01:16:39,469
And what's the best defense?

601
01:16:39,762 --> 01:16:41,888
Shichiroji knows what to do.

602
01:16:42,556 --> 01:16:45,976
See these logs?
He'll make a fence to block the horses.

603
01:16:46,143 --> 01:16:48,645
Indeed.
Your trusty right-hand man.

604
01:17:17,633 --> 01:17:18,967
All right!

605
01:17:19,552 --> 01:17:21,136
Listen.

606
01:17:22,263 --> 01:17:24,264
Nothing forces you to run
like a battle.

607
01:17:24,765 --> 01:17:27,642
You run when you attack,
you run when you retreat.

608
01:17:27,810 --> 01:17:30,186
when you can't run anymore,
you die.

609
01:17:48,664 --> 01:17:51,207
SOUTH

610
01:18:04,513 --> 01:18:08,224
we'll flood these fields
after they harvest the barley.

611
01:18:08,476 --> 01:18:13,104
That'll make a good defense.
But will we have time?

612
01:18:13,272 --> 01:18:14,606
Indeed.

613
01:18:22,198 --> 01:18:23,656
Charge!

614
01:18:24,617 --> 01:18:28,787
Pretend I'm a bandit
and stab me.

615
01:18:31,749 --> 01:18:33,416
Charge!

616
01:18:36,587 --> 01:18:38,296
Come on!

617
01:18:47,264 --> 01:18:51,976
Next.

618
01:18:52,269 --> 01:18:54,396
what's wrong with all of you?

619
01:19:18,421 --> 01:19:21,589
EAST

620
01:19:25,094 --> 01:19:29,722
Destroying this bridge
will foil an assault from the east.

621
01:19:36,730 --> 01:19:39,899
But what about the houses
on the other side?

622
01:19:47,199 --> 01:19:49,826
They'll have to evacuate those.

623
01:19:54,165 --> 01:19:56,291
And the mill?

624
01:19:58,210 --> 01:20:01,421
The Old Man's
not going to go quietly.

625
01:20:07,636 --> 01:20:10,472
Listen now.
The enemy is scary.

626
01:20:11,056 --> 01:20:12,599
Everybody's scared.

627
01:20:12,766 --> 01:20:16,269
But the other side's
scared of us too.

628
01:20:45,591 --> 01:20:47,300
Just great.

629
01:20:48,260 --> 01:20:51,012
You all make great scarecrows.

630
01:20:53,349 --> 01:20:57,268
Problem is, the enemy
isn't a bunch of sparrows and crows!

631
01:21:05,694 --> 01:21:09,405
You there, chewing your cud.
Can you cut that out?

632
01:21:13,536 --> 01:21:15,578
This isn't a cow shed!

633
01:21:18,874 --> 01:21:21,292
Look at the bunch of you.

634
01:21:24,213 --> 01:21:25,880
Shit!

635
01:21:26,048 --> 01:21:28,758
First in line, step forward!

636
01:21:31,095 --> 01:21:33,179
I'm talking to you!

637
01:21:33,722 --> 01:21:34,931
You!

638
01:21:55,160 --> 01:21:58,454
Look here! You gotta pay
a mon each to watch the show!

639
01:22:17,349 --> 01:22:19,100
what's this?

640
01:22:20,102 --> 01:22:23,062
- A spear, sir.
- Idiot.

641
01:22:23,230 --> 01:22:25,982
where the hell
did you get it?

642
01:22:26,900 --> 01:22:29,402
Did it sprout up in those hills?

643
01:22:31,780 --> 01:22:33,281
I know perfectly well.

644
01:22:33,449 --> 01:22:35,908
You hunted down retreating warriors
and took their weapons.

645
01:22:36,160 --> 01:22:39,912
If you've got one,
you must have more.

646
01:22:42,499 --> 01:22:44,417
Fess up, damn it!

647
01:22:53,177 --> 01:22:55,678
NORTH

648
01:23:05,064 --> 01:23:09,317
what a peaceful grove.
But it's also a death trap.

649
01:23:45,145 --> 01:23:46,688
Katsushiro.

650
01:23:47,022 --> 01:23:49,273
we're going.
- I'll be right there.

651
01:23:57,241 --> 01:23:59,200
As I said,
he's still a child.

652
01:25:00,763 --> 01:25:03,556
Are you from the village?

653
01:25:08,103 --> 01:25:09,479
Are you a girl?

654
01:25:13,192 --> 01:25:15,443
A boy?

655
01:25:16,278 --> 01:25:19,280
Then where's your spear?

656
01:25:19,448 --> 01:25:22,867
Is this any time for an able-bodied man
to be picking flowers?

657
01:25:23,744 --> 01:25:26,037
Come here!
I'll teach you.

658
01:25:26,455 --> 01:25:28,039
Come here!

659
01:25:32,419 --> 01:25:34,128
why, you!

660
01:26:38,861 --> 01:26:41,821
This is fine, and this too.

661
01:26:41,989 --> 01:26:43,906
But this is a problem.

662
01:26:44,408 --> 01:26:46,993
Heave ho! Heave ho!

663
01:26:49,830 --> 01:26:52,248
Get back, the rest of you!

664
01:26:52,875 --> 01:26:55,376
Stand up straight!

665
01:27:00,716 --> 01:27:02,550
what a haul!

666
01:27:08,974 --> 01:27:10,308
what's all this?

667
01:27:10,475 --> 01:27:12,852
Plunder from defeated warriors.

668
01:27:14,479 --> 01:27:16,397
where did you find it?

669
01:27:16,565 --> 01:27:19,567
Here in the village?
- Yep, over at Manzo's.

670
01:27:29,119 --> 01:27:30,912
what's the matter?

671
01:27:32,915 --> 01:27:34,749
Don't you like 'em?

672
01:27:36,877 --> 01:27:39,420
This is good stuff.

673
01:27:40,964 --> 01:27:42,590
what's wrong?

674
01:27:42,758 --> 01:27:46,177
You said you wanted armor,
spears and bows. Now you got 'em.

675
01:27:46,345 --> 01:27:48,804
Bastard!
You call yourself a samurai?

676
01:27:50,098 --> 01:27:53,100
Those farmers killed samurai
to get these.

677
01:27:53,268 --> 01:27:55,269
- I know that.
- Then why the hell -

678
01:27:55,437 --> 01:27:57,271
That's enough!

679
01:27:58,607 --> 01:28:02,276
You can't understand
unless you've been hunted.

680
01:28:15,082 --> 01:28:17,792
It's nothing.
Get outta here.

681
01:28:41,066 --> 01:28:45,987
Now I want to kill them all.

682
01:28:59,835 --> 01:29:01,794
well, that's just fine and dandy!

683
01:29:04,297 --> 01:29:08,759
what did ya think
these farmers were anyway?

684
01:29:08,927 --> 01:29:11,512
Buddhas or something?

685
01:29:12,014 --> 01:29:13,639
Don't make me laugh!

686
01:29:13,807 --> 01:29:16,267
There's no creature on earth
as wily as a farmer!

687
01:29:22,107 --> 01:29:24,984
Ask 'em for rice, barley,
anything,

688
01:29:25,152 --> 01:29:27,528
and all they ever say is,
"we're all out."

689
01:29:28,905 --> 01:29:33,242
But they've got it.
They've got everything.

690
01:29:34,161 --> 01:29:38,205
Dig under the floorboards.
If it's not there, try the barn.

691
01:29:38,373 --> 01:29:43,878
You'll find plenty.
Jars of rice, salt, beans, sake!

692
01:29:48,884 --> 01:29:52,053
Go up in the mountains.
They have hidden fields.

693
01:29:52,596 --> 01:29:55,264
They kowtow and lie,
playing innocent the whole time.

694
01:29:55,432 --> 01:29:57,892
You name it,
they'll cheat you on it!

695
01:29:58,060 --> 01:30:01,103
After a battle, they hunt down
the losers with their spears.

696
01:30:03,482 --> 01:30:04,648
Listen to me!

697
01:30:04,816 --> 01:30:08,402
Farmers are misers, weasels,

698
01:30:08,570 --> 01:30:09,820
and crybabies!

699
01:30:09,988 --> 01:30:12,406
They're mean, stupid

700
01:30:12,574 --> 01:30:14,366
murderers!

701
01:30:14,576 --> 01:30:17,703
Damn!
I could laugh till I cry!

702
01:30:21,333 --> 01:30:25,169
But tell me this:
who turned them into such monsters?

703
01:30:25,420 --> 01:30:28,839
You did!
You samurai did!

704
01:30:29,257 --> 01:30:31,092
Damn you to hell!

705
01:30:37,933 --> 01:30:39,767
In war, you burn their villages,

706
01:30:39,935 --> 01:30:43,104
trample their fields,
steal their food,

707
01:30:43,855 --> 01:30:46,941
work them like slaves,
rape their women,

708
01:30:47,109 --> 01:30:48,776
and kill 'em if they resist.

709
01:30:48,944 --> 01:30:50,820
what do you expect 'em to do?

710
01:30:50,987 --> 01:30:53,322
what the hell are farmers
supposed to do?

711
01:30:53,490 --> 01:30:55,991
Damn it! Goddamn it!

712
01:31:33,780 --> 01:31:37,408
You were born a farmer,
weren't you?

713
01:32:14,946 --> 01:32:18,282
what is it now?

714
01:32:18,450 --> 01:32:22,411
Nothing at all.
Everything's fine.

715
01:33:28,103 --> 01:33:29,645
It's me.

716
01:33:29,896 --> 01:33:31,939
I'm sleeping here
from now on.

717
01:33:32,607 --> 01:33:34,942
Those guys cramp my style.

718
01:33:36,695 --> 01:33:39,780
Idiot! Stop cowering!

719
01:33:40,448 --> 01:33:42,491
This is your place!

720
01:33:42,993 --> 01:33:45,828
You hand over your house
and sleep in a barn,

721
01:33:45,996 --> 01:33:47,830
and still you can't stand up
for yourself.

722
01:33:47,998 --> 01:33:49,540
Get to sleep!

723
01:34:06,141 --> 01:34:08,100
Brings back memories.

724
01:34:26,494 --> 01:34:28,454
Sure is quiet.

725
01:34:31,333 --> 01:34:36,670
On a day like this, it's hard
to imagine bandits on that mountain.

726
01:34:38,590 --> 01:34:41,717
Damn it all,
I need a girl!

727
01:34:50,518 --> 01:34:52,019
- where are you going?
- The hills.

728
01:34:52,187 --> 01:34:54,313
- The hills?
- To practice.

729
01:34:55,940 --> 01:34:57,566
No girls up there.

730
01:34:59,235 --> 01:35:02,029
Sometimes you really
hit the nail on the head.

731
01:35:03,156 --> 01:35:05,449
what are you making there?

732
01:35:05,617 --> 01:35:07,576
- A flag.
- A flag?

733
01:35:08,286 --> 01:35:13,957
It doesn't feel right in battle
without a banner to raise high.

734
01:35:18,755 --> 01:35:20,506
what do the symbols mean?

735
01:35:20,673 --> 01:35:25,511
This represents a field:
that is, the farmers and this village.

736
01:35:26,388 --> 01:35:28,806
- And those circles?
- Those are us.

737
01:35:29,724 --> 01:35:32,393
There's only six.
You leaving me out?

738
01:35:32,560 --> 01:35:35,687
No, this triangle's Lord Kikuchiyo.

739
01:35:35,855 --> 01:35:37,731
That's a good one!

740
01:36:58,897 --> 01:37:00,647
It's real rice.

741
01:37:00,940 --> 01:37:02,858
Go ahead. Eat.
- But -

742
01:37:03,026 --> 01:37:05,235
Rikichi gave me some millet.

743
01:37:05,403 --> 01:37:09,740
I could barely get it down.

744
01:37:11,743 --> 01:37:13,535
Go ahead. Eat.

745
01:37:24,839 --> 01:37:26,298
Hurry up and eat.

746
01:37:26,466 --> 01:37:28,342
If you're embarrassed, I'll go.

747
01:37:28,510 --> 01:37:30,385
I'm not going to eat it.

748
01:37:30,595 --> 01:37:32,846
why not?
I went to a lot of trouble.

749
01:37:33,014 --> 01:37:34,932
No, I just -

750
01:37:36,184 --> 01:37:41,480
I know you did, so I'll take it
to Kyuemon's grandma.

751
01:37:41,689 --> 01:37:44,441
Kyuemon's grandma?

752
01:38:05,088 --> 01:38:09,383
Rikichi, I'm full.
I'll save the rest for later.

753
01:38:10,093 --> 01:38:12,511
Go ahead and eat.

754
01:38:12,720 --> 01:38:14,721
Take my leftovers this time.

755
01:38:15,723 --> 01:38:19,309
what's this?
what are you up to?

756
01:38:19,477 --> 01:38:21,061
what's going on?

757
01:38:29,070 --> 01:38:30,904
How terrible.

758
01:38:32,323 --> 01:38:36,451
Doesn't she have family?
- The bandits got them all.

759
01:38:42,917 --> 01:38:44,418
I...

760
01:38:45,253 --> 01:38:50,048
want to die quickly.

761
01:38:50,216 --> 01:38:54,469
I want to die soon

762
01:38:54,637 --> 01:38:58,932
and leave this suffering behind.

763
01:39:00,476 --> 01:39:02,894
But you know...

764
01:39:03,938 --> 01:39:07,858
the other world may be

765
01:39:08,026 --> 01:39:12,195
just as full of suffering
as this one.

766
01:39:13,990 --> 01:39:15,782
It's not.

767
01:39:15,950 --> 01:39:20,329
In that world
there's no war and no bandits.

768
01:39:20,663 --> 01:39:22,873
There's no suffering there,
grandma.

769
01:39:23,041 --> 01:39:26,668
How the hell would you know?
Have you been there?

770
01:39:26,836 --> 01:39:28,629
why the hell
are you always screaming?

771
01:39:28,796 --> 01:39:30,505
I hate wimps.

772
01:39:30,673 --> 01:39:33,342
worms like her make me sick!

773
01:39:35,887 --> 01:39:38,013
Pissing and grumbling
about everything.

774
01:39:39,474 --> 01:39:42,476
Shit!
I want to do something wild!

775
01:39:42,685 --> 01:39:46,605
Save your spit and fire
for the bandits.

776
01:40:02,330 --> 01:40:04,164
Excuse me.

777
01:40:06,084 --> 01:40:09,252
Excuse me, but why did you -

778
01:40:09,504 --> 01:40:12,255
You saw us today, didn't you?

779
01:40:12,423 --> 01:40:14,925
Me and the -

780
01:40:15,093 --> 01:40:17,094
- The girl?
- Yes.

781
01:40:18,054 --> 01:40:21,848
why didn't you -
- Tell them? You want me to?

782
01:40:37,031 --> 01:40:41,493
we want rice!
white rice!

783
01:40:46,207 --> 01:40:49,876
You little brats!
There's no rice!

784
01:40:55,550 --> 01:40:57,592
Quit yapping!

785
01:40:57,760 --> 01:41:02,764
If you've got the strength
to scream, "we want rice!"

786
01:41:02,932 --> 01:41:05,350
then you don't need it!

787
01:41:05,727 --> 01:41:08,603
Listen here,
you little piss pants.

788
01:41:10,648 --> 01:41:12,899
This is all the rice there is.

789
01:41:13,067 --> 01:41:16,278
If we give you any more,
we'll get all -

790
01:41:19,949 --> 01:41:21,450
That's how it is.

791
01:41:21,617 --> 01:41:25,412
Say, any of you got
a pretty sister?

792
01:41:27,832 --> 01:41:31,585
How about you?
You got one?

793
01:41:31,794 --> 01:41:35,422
So, Old Man,
when is the harvest?

794
01:41:37,759 --> 01:41:39,593
In ten days.

795
01:41:39,761 --> 01:41:42,053
How quickly can you do it?

796
01:41:44,056 --> 01:41:46,933
No less than three days.

797
01:41:47,935 --> 01:41:50,061
we'll flood the fields
when you're done.

798
01:41:50,229 --> 01:41:54,065
You see, we want to create
a moat to the south of the village.

799
01:41:54,233 --> 01:41:56,401
It'll keep the horses out.

800
01:41:56,569 --> 01:41:59,946
we don't need all the fields.
One patch per family will do.

801
01:42:00,114 --> 01:42:01,615
Then...

802
01:42:02,116 --> 01:42:06,453
it'll take at least a day to flatten
the paths and draw the water.

803
01:42:06,621 --> 01:42:08,997
Understood.

804
01:42:09,290 --> 01:42:11,625
There's one other thing.

805
01:42:12,084 --> 01:42:18,381
You need to leave the houses this side
of the bridge, and the mill too.

806
01:42:19,467 --> 01:42:21,259
Father!

807
01:42:21,511 --> 01:42:23,678
You want us to move out?

808
01:42:30,978 --> 01:42:33,313
I know it's tough.

809
01:42:34,941 --> 01:42:37,067
But there's no choice.

810
01:42:38,653 --> 01:42:42,614
we can't possibly protect
the outlying houses.

811
01:43:03,803 --> 01:43:07,097
Listen carefully. You'll soon
begin harvesting the barley.

812
01:43:07,348 --> 01:43:09,307
The bandits will come
when you're done.

813
01:43:09,475 --> 01:43:11,351
we have to assume that.

814
01:43:11,519 --> 01:43:15,313
Therefore we prepare
for battle as we harvest.

815
01:43:15,690 --> 01:43:19,234
we'll harvest not as families
but as squads.

816
01:43:19,694 --> 01:43:24,030
Starting tomorrow,
each squad will live and work as one.

817
01:43:24,198 --> 01:43:29,119
Understood? Starting tomorrow,
nobody acts on his own.

818
01:43:30,371 --> 01:43:32,289
Hey, everybody.

819
01:43:33,875 --> 01:43:37,878
Give your wives
plenty of lovin' tonight, you hear?

820
01:43:59,025 --> 01:44:01,568
This is all a load of crap!

821
01:44:01,736 --> 01:44:04,571
Everyone from across the bridge,
follow me.

822
01:44:07,241 --> 01:44:09,367
Throw down your spears.

823
01:44:09,535 --> 01:44:13,580
why should we abandon
our homes to protect theirs?

824
01:44:14,415 --> 01:44:18,043
That's right.
we'll protect our homes ourselves.

825
01:44:20,087 --> 01:44:21,713
Stop!

826
01:44:24,800 --> 01:44:26,676
Pick up your spears!

827
01:44:27,303 --> 01:44:28,803
Return to your line!

828
01:44:54,622 --> 01:44:56,873
Fall in!

829
01:44:57,792 --> 01:45:00,043
Squad formation!

830
01:45:03,047 --> 01:45:05,507
where's Yohei gone?

831
01:45:06,884 --> 01:45:08,635
where the hell's Yohei?

832
01:45:14,141 --> 01:45:17,227
There you are, you idiot!

833
01:45:34,829 --> 01:45:37,038
There are three outlying houses,

834
01:45:37,873 --> 01:45:39,958
but 20 in the village.

835
01:45:40,793 --> 01:45:44,754
we can't risk 20
to save three.

836
01:45:46,007 --> 01:45:50,343
And if this village is destroyed,

837
01:45:51,178 --> 01:45:53,388
those three cannot survive
on their own.

838
01:45:57,435 --> 01:46:00,937
Is that clear?
This is the nature of war:

839
01:46:02,440 --> 01:46:05,275
By protecting others,
you save yourself.

840
01:46:07,236 --> 01:46:09,738
If you only think of yourself,

841
01:46:10,197 --> 01:46:12,407
you'll only destroy yourself.

842
01:46:15,494 --> 01:46:19,289
From this day forward,
anyone caught doing that...

843
01:46:45,900 --> 01:46:49,486
INTERMISSION

844
01:52:48,971 --> 01:52:50,596
Hot damn!

845
01:52:50,764 --> 01:52:52,598
Look at all those girls!

846
01:52:52,850 --> 01:52:54,225
Hey, Yohei!

847
01:52:59,773 --> 01:53:02,567
where the hell
have you been hiding these girls?

848
01:53:06,864 --> 01:53:08,656
You devil.

849
01:53:16,457 --> 01:53:18,749
Hey, lend me your scythe.

850
01:53:19,918 --> 01:53:21,961
I'll cut three times your share.

851
01:53:22,129 --> 01:53:25,173
In return,
we get nice and friendly, eh?

852
01:53:49,198 --> 01:53:50,656
- Rikichi.
- Yes.

853
01:53:51,867 --> 01:53:55,536
It seems the married couples
are the most productive.

854
01:53:56,205 --> 01:53:58,372
Time you got yourself a wife.

855
01:54:01,752 --> 01:54:05,922
why do you always get so mad?
I just said you should -

856
01:54:07,132 --> 01:54:09,425
Katsushiro, go after him.

857
01:54:09,593 --> 01:54:11,719
Running off at a time like this.

858
01:54:12,888 --> 01:54:16,807
Rikichi!

859
01:54:20,979 --> 01:54:23,689
Shino, what are you gawking at?

860
01:54:39,790 --> 01:54:43,000
what's this? A bear's den?

861
01:54:45,003 --> 01:54:47,171
This was done with a scythe.

862
01:54:49,299 --> 01:54:50,633
was it Rikichi?

863
01:54:51,218 --> 01:54:53,719
Yes, though I didn't actually
see him do it.

864
01:54:53,887 --> 01:54:56,097
I lost him for a while,

865
01:54:56,265 --> 01:54:58,182
but then I spotted him
leaving this grove.

866
01:54:58,350 --> 01:55:01,519
He was furious,
soaked in sweat.

867
01:55:05,107 --> 01:55:06,774
what did you say to him?

868
01:55:06,942 --> 01:55:10,444
Nothing. Just that he should
hurry up and find a wife.

869
01:55:13,740 --> 01:55:17,952
Something's upsetting the little bugger,
but he won't say what.

870
01:55:18,412 --> 01:55:20,830
You can see it
all over his face.

871
01:55:21,623 --> 01:55:27,211
Those lips of his
are bolted up tight as a house.

872
01:55:27,379 --> 01:55:29,797
why don't you try to open them up?

873
01:55:37,180 --> 01:55:38,097
who's there?

874
01:55:38,265 --> 01:55:39,557
It's me.

875
01:55:41,893 --> 01:55:44,437
All clear?
- Yes.

876
01:55:51,820 --> 01:55:55,823
Have a seat.
Let's have a little chat.

877
01:56:00,996 --> 01:56:04,540
I think talking...

878
01:56:05,208 --> 01:56:07,084
is a good thing.

879
01:56:07,628 --> 01:56:11,672
whatever your burden may be,
talking can ease it.

880
01:56:14,843 --> 01:56:18,763
You, for example,
seem pretty tight-lipped,

881
01:56:19,181 --> 01:56:23,893
but if you're suffering,
you shouldn't bottle it up.

882
01:56:26,647 --> 01:56:31,192
Letting out your feelings
bit by bit can work wonders.

883
01:56:32,402 --> 01:56:35,071
I've got nothing to say.

884
01:56:52,673 --> 01:56:54,548
Time to head out.

885
01:56:57,052 --> 01:56:58,135
Shall we wake him?

886
01:56:58,303 --> 01:57:00,513
No, let the kid sleep.

887
01:57:04,434 --> 01:57:05,893
Shino.

888
01:57:08,647 --> 01:57:10,731
I swear he just said "Shino."

889
01:57:13,735 --> 01:57:15,611
Sounds like a woman's name.

890
01:57:15,779 --> 01:57:18,614
Even kids can be charmers
in their dreams.

891
01:57:24,996 --> 01:57:27,540
where shall we start our rounds?

892
01:57:27,708 --> 01:57:30,918
The place that worries us most,
of course.

893
01:58:28,268 --> 01:58:38,110
who's there?

894
01:58:38,653 --> 01:58:40,321
Come out here!

895
01:58:41,031 --> 01:58:42,031
who's there?

896
01:58:42,199 --> 01:58:43,657
Kikuchiyo.

897
01:58:45,994 --> 01:58:48,078
You're lucky it was us.

898
01:58:48,455 --> 01:58:51,624
If we'd been bandits,
you'd be headless right now.

899
01:59:23,615 --> 01:59:25,157
Yohei.

900
01:59:26,535 --> 01:59:28,244
what's this?

901
01:59:28,537 --> 01:59:30,663
That's my horse, sir.

902
01:59:32,958 --> 01:59:35,793
I thought it was a big old mouse.

903
02:00:15,417 --> 02:00:19,503
The sparrows chirp, chirp, chirp

904
02:00:20,422 --> 02:00:24,258
The crows caw, caw, caw

905
02:00:28,054 --> 02:00:31,348
I wonder why
the bandits aren't coming.

906
02:00:33,643 --> 02:00:39,106
what a waste if they don't.
Think how much we feed those samurai.

907
02:00:39,274 --> 02:00:43,068
Idiot!
It's best if they don't come!

908
02:00:49,618 --> 02:00:52,870
A nag like that
can't carry your weight!

909
02:00:53,038 --> 02:00:56,332
Yohei's horse is too worn out.

910
02:00:58,418 --> 02:01:01,545
Please stop. Yohei'll be in tears
if you break its leg.

911
02:01:01,713 --> 02:01:05,299
A skilled horseman
can make even a nag soar into the sky.

912
02:01:17,270 --> 02:01:18,520
Not bad.

913
02:01:34,245 --> 02:01:36,205
Very fine indeed!

914
02:02:00,188 --> 02:02:02,272
They seem to be having fun.

915
02:02:03,817 --> 02:02:06,694
The threshing's done,
and still no bandits.

916
02:02:07,112 --> 02:02:10,531
Everyone's saying
they might not come after all.

917
02:02:11,741 --> 02:02:14,034
A tempting thought.

918
02:02:14,536 --> 02:02:19,748
But when you think you're safe
is precisely when you're most vulnerable.

919
02:02:21,042 --> 02:02:23,460
Send them back
to their posts.

920
02:02:56,911 --> 02:03:00,664
I wish I'd been born
into a samurai family.

921
02:03:03,752 --> 02:03:05,753
A farmer's life is too cruel.

922
02:03:06,838 --> 02:03:09,923
My life has been so easy,
I'm ashamed.

923
02:03:10,091 --> 02:03:12,426
That's not what I meant.

924
02:03:12,761 --> 02:03:17,264
It's because you're a samurai
and I'm a farmer.

925
02:03:17,432 --> 02:03:18,891
But I don't -

926
02:03:19,059 --> 02:03:22,311
It's all right. I don't mind.
we can't know

927
02:03:22,479 --> 02:03:24,688
what the future holds!

928
02:03:57,972 --> 02:04:01,225
Coward!
Act like a samurai!

929
02:05:08,251 --> 02:05:11,044
Three suspicious characters
on the western road.

930
02:05:13,464 --> 02:05:16,258
- The villagers haven't noticed?
- Not yet.

931
02:05:16,426 --> 02:05:18,510
we can't have them
sounding the alarm.

932
02:05:20,889 --> 02:05:23,807
I saw three horses
up in the hills.

933
02:05:23,975 --> 02:05:26,894
I think they're bandits.
- we know.

934
02:05:31,566 --> 02:05:33,817
- So they're here.
- How did you know?

935
02:05:33,985 --> 02:05:37,196
How could I not?
This one here was in such a panic.

936
02:05:40,575 --> 02:05:43,243
where are they coming from?
The mountains or the west?

937
02:05:45,580 --> 02:05:47,080
The west.

938
02:05:55,757 --> 02:05:56,632
Bandits!

939
02:06:01,137 --> 02:06:04,264
Send everyone to their houses.
There are only three of them.

940
02:06:04,432 --> 02:06:07,226
Tell them to keep quiet
no matter what.

941
02:06:07,393 --> 02:06:11,772
They're probably scouts.
we can't let them see any samurai.

942
02:06:28,957 --> 02:06:31,124
what is it?

943
02:06:31,501 --> 02:06:33,293
Bandits?

944
02:06:35,964 --> 02:06:39,007
Bandits, eh?
where are they?

945
02:06:50,645 --> 02:06:51,979
Quiet!

946
02:06:53,982 --> 02:06:55,857
where are they, Shichiroji?

947
02:06:56,025 --> 02:06:58,777
Beyond the fence.

948
02:07:13,167 --> 02:07:15,752
No doubt about it - they're scouts.

949
02:07:16,254 --> 02:07:18,171
The fence took them by surprise.

950
02:07:19,257 --> 02:07:21,675
They don't seem
to realize we're here.

951
02:07:21,843 --> 02:07:24,970
with luck they'll report
there are only farmers here.

952
02:07:26,514 --> 02:07:29,099
Hey, where is everyone?

953
02:07:29,267 --> 02:07:30,976
That idiot!

954
02:07:32,020 --> 02:07:33,937
Kikuchiyo!

955
02:07:40,153 --> 02:07:42,529
Hey, I hear the bandits are here.

956
02:07:44,198 --> 02:07:44,990
You fool.

957
02:07:45,158 --> 02:07:47,492
Too late.
They've seen us.

958
02:07:58,338 --> 02:08:01,882
If they report back that samurai
are here, we're finished.

959
02:08:02,717 --> 02:08:05,886
I'll kill them.
The mountain's my territory.

960
02:08:06,179 --> 02:08:07,220
I was just -

961
02:08:07,388 --> 02:08:11,183
Enough. You can make up for it
by getting one.

962
02:08:11,351 --> 02:08:12,726
Head them off at -

963
02:08:12,894 --> 02:08:15,771
I know, at their horses.
Take us there.

964
02:08:16,898 --> 02:08:18,523
Katsushiro!

965
02:08:19,359 --> 02:08:21,902
Just watch, you understand?

966
02:08:28,951 --> 02:08:31,161
Those are some horses!

967
02:08:35,958 --> 02:08:37,876
wait in this hollow.

968
02:08:46,761 --> 02:08:49,471
- what do you plan to do?
- who, me?

969
02:10:49,884 --> 02:10:52,052
Katsushiro.

970
02:10:52,887 --> 02:10:55,096
You can come out now.

971
02:10:58,392 --> 02:11:00,268
Help me!

972
02:11:19,330 --> 02:11:21,081
Back off!

973
02:11:22,375 --> 02:11:26,670
He's a captive who has confessed.
He's begging for his life.

974
02:11:26,837 --> 02:11:30,298
You can't just
chop him to pieces.

975
02:11:31,592 --> 02:11:32,842
Stay out of this!

976
02:11:34,595 --> 02:11:36,805
Let me do it! Scum!

977
02:11:54,865 --> 02:11:56,658
All right.

978
02:11:57,118 --> 02:11:59,786
Let her avenge her son's death.

979
02:12:02,081 --> 02:12:04,833
Someone help her!

980
02:12:05,001 --> 02:12:06,626
I'll do it!

981
02:12:15,469 --> 02:12:19,264
- That bandit said their fort -
- It's hardly a fort.

982
02:12:19,432 --> 02:12:23,310
It's full of holes,
like Yohei's underwear.

983
02:12:23,477 --> 02:12:25,812
- Easy to sneak in.
- Let's attack at night.

984
02:12:25,980 --> 02:12:29,566
They have 40 men.
we'd usually pick off a few first.

985
02:12:29,734 --> 02:12:32,694
wait. we can't afford
to lose a single man,

986
02:12:32,862 --> 02:12:35,322
even if we kill five
for every one lost.

987
02:12:35,489 --> 02:12:40,035
- war is always a gamble.
- Three of us can take 10 of them.

988
02:12:41,037 --> 02:12:42,579
Rikichi.

989
02:12:42,747 --> 02:12:45,707
How far away is their hideout?

990
02:12:45,875 --> 02:12:47,375
At least a day.

991
02:12:47,543 --> 02:12:50,378
Hey, we've got
three of their horses.

992
02:12:50,546 --> 02:12:52,672
Half a day by horse.

993
02:13:04,685 --> 02:13:06,311
Very well. Let's do it.

994
02:13:06,479 --> 02:13:09,439
If we leave now,
we'll arrive before dawn.

995
02:13:09,607 --> 02:13:11,358
But who should go?

996
02:13:14,528 --> 02:13:15,695
Not you.

997
02:13:18,407 --> 02:13:20,742
And me makes three.

998
02:13:21,619 --> 02:13:23,536
They need a guide!

999
02:13:23,704 --> 02:13:26,122
There aren't enough horses.

1000
02:13:26,290 --> 02:13:28,375
There's Yohei's horse.
You ride that.

1001
02:13:28,542 --> 02:13:30,752
The only man
to master that steed

1002
02:13:30,920 --> 02:13:32,545
is Lord Kikuchiyo himself.

1003
02:13:41,597 --> 02:13:43,807
whoa! what the hell?

1004
02:13:44,642 --> 02:13:46,851
It's the other way!

1005
02:13:49,271 --> 02:13:51,147
Stupid horse!

1006
02:13:51,774 --> 02:13:55,735
This way, you useless mule!

1007
02:13:56,487 --> 02:13:59,072
You call yourself a horse?

1008
02:13:59,240 --> 02:14:01,408
You should be
ashamed of yourself!

1009
02:14:03,285 --> 02:14:05,120
Hey, wait!

1010
02:14:07,415 --> 02:14:11,251
Please stop! I apologize!

1011
02:14:11,419 --> 02:14:12,919
I'm sorry!

1012
02:15:39,465 --> 02:15:41,925
Hey, let's set the place on fire!

1013
02:15:42,092 --> 02:15:44,010
Cut 'em down as they run out!

1014
02:18:18,332 --> 02:18:20,333
Serves you right!

1015
02:18:20,960 --> 02:18:22,710
we did it!

1016
02:18:25,172 --> 02:18:27,131
Take that, you sons of bitches!

1017
02:19:10,134 --> 02:19:11,467
Heihachi!

1018
02:19:32,281 --> 02:19:34,615
Are you crazy?

1019
02:19:50,382 --> 02:19:51,632
Stupid idiot!

1020
02:19:51,800 --> 02:19:55,053
Look what you've done!
who is she to you?

1021
02:19:56,430 --> 02:19:58,765
She's my wife!

1022
02:20:02,352 --> 02:20:05,104
Heihachi, hang on!

1023
02:20:44,311 --> 02:20:45,978
You said...

1024
02:20:47,940 --> 02:20:50,983
he'd be a treasure
in hard times.

1025
02:20:52,736 --> 02:20:55,113
The hard times
have only just begun.

1026
02:21:05,207 --> 02:21:06,499
Stop crying!

1027
02:21:07,167 --> 02:21:09,252
Damn fool!

1028
02:21:10,504 --> 02:21:12,171
Stop crying!

1029
02:22:40,052 --> 02:22:42,178
Goddamn!
Here they come!

1030
02:23:55,377 --> 02:23:59,171
Take note:
They have three muskets.

1031
02:24:24,823 --> 02:24:27,033
Twenty riders bound north,
13 south.

1032
02:24:27,200 --> 02:24:29,368
- Muskets?
- Three in all.

1033
02:24:30,537 --> 02:24:33,539
Take the south, and watch out
for those muskets.

1034
02:25:29,846 --> 02:25:32,181
Retreat! Retreat!

1035
02:25:47,781 --> 02:25:51,325
- The 12 headed south have turned east.
- wasn't that 13?

1036
02:25:51,535 --> 02:25:53,494
An arrow got one of them.

1037
02:25:53,662 --> 02:25:55,246
Good old Gorobei.

1038
02:25:57,999 --> 02:26:01,293
Make sure the eastern bridge is out,
and watch out for -

1039
02:26:01,461 --> 02:26:03,003
The muskets!

1040
02:26:12,055 --> 02:26:15,641
Take the north.
That's where we'll battle it out.

1041
02:26:16,601 --> 02:26:20,062
If you knew that, why didn't
you build a fence there too?

1042
02:26:20,230 --> 02:26:22,648
Every great castle
needs a breach.

1043
02:26:22,816 --> 02:26:27,111
Draw the enemy there and attack.
You can't win by defense alone.

1044
02:26:38,832 --> 02:26:41,000
Use your balls,
if you've got any!

1045
02:26:45,088 --> 02:26:47,631
Take it away, damn it!

1046
02:26:51,178 --> 02:26:53,888
Twelve riders are on the way.
Hurry with the bridge!

1047
02:26:54,097 --> 02:26:56,807
Are you blind?
what do you think we're doing?

1048
02:26:58,727 --> 02:27:01,145
And he said
to watch out for the muskets.

1049
02:27:01,313 --> 02:27:03,355
what kinda idiot
you take me for?

1050
02:27:09,946 --> 02:27:11,322
where are you going?

1051
02:27:11,490 --> 02:27:14,325
we're looking for Father.
we can't find him anywhere.

1052
02:27:14,618 --> 02:27:19,205
Father intends to die in that barn.
That's what he's always wanted.

1053
02:27:24,920 --> 02:27:27,087
Stubborn old fool!

1054
02:27:27,589 --> 02:27:29,798
Hurry up and get him!

1055
02:27:33,386 --> 02:27:35,429
Get out of our way!

1056
02:27:36,389 --> 02:27:39,725
what are you doing?
Hurry up!

1057
02:28:01,498 --> 02:28:03,832
- On this mountain -
- Twenty riders.

1058
02:28:04,251 --> 02:28:06,835
And 12 to the east.

1059
02:28:07,003 --> 02:28:08,420
Right.

1060
02:28:24,229 --> 02:28:27,356
This won't do.
They're all scared stiff.

1061
02:28:31,194 --> 02:28:32,778
Good! Again!

1062
02:28:34,364 --> 02:28:35,948
Again!

1063
02:28:39,244 --> 02:28:42,454
Shichiroji's at it.
Let's fire ours up too.

1064
02:28:43,957 --> 02:28:45,666
Everybody out here!

1065
02:28:50,922 --> 02:28:53,424
Raise your spears
and give the battle cry.

1066
02:28:58,054 --> 02:28:58,971
Again!

1067
02:29:03,310 --> 02:29:06,270
Damn 'em, listen to that!
we can beat 'em!

1068
02:29:10,150 --> 02:29:12,818
Yohei, what's that look for?
Again!

1069
02:29:17,991 --> 02:29:19,950
Take cover!

1070
02:29:24,664 --> 02:29:26,540
Here they come!

1071
02:29:43,183 --> 02:29:44,600
Goddamn 'em!

1072
02:30:20,887 --> 02:30:24,014
Hey, where do you think
you're going?

1073
02:30:28,395 --> 02:30:30,604
Oh, no, you don't!

1074
02:30:35,402 --> 02:30:36,985
Don't panic!

1075
02:30:45,912 --> 02:30:48,330
Goddamn you!

1076
02:30:52,419 --> 02:30:53,877
They're burning!

1077
02:30:54,254 --> 02:30:56,171
Damn bastards!

1078
02:31:25,952 --> 02:31:29,037
Back to your posts, everyone!

1079
02:31:30,206 --> 02:31:31,915
Dear!

1080
02:31:33,835 --> 02:31:36,587
They're just rickety shacks!

1081
02:31:39,507 --> 02:31:42,509
Everybody, back to your posts!

1082
02:31:53,980 --> 02:31:55,522
Goddamn it!

1083
02:31:57,233 --> 02:31:58,984
You dogs!

1084
02:31:59,235 --> 02:32:01,820
That's the Old Man's house!

1085
02:32:04,365 --> 02:32:07,075
where's the Old Man?
what about that couple?

1086
02:32:07,535 --> 02:32:10,537
And the little brat?
what the hell's going on?

1087
02:32:13,625 --> 02:32:16,585
Stop!
You can't abandon your post!

1088
02:32:18,505 --> 02:32:20,589
Kikuchiyo, come back!

1089
02:32:22,675 --> 02:32:24,176
Kikuchiyo!

1090
02:32:39,359 --> 02:32:42,152
where's the Old Man
and your husband?

1091
02:32:52,121 --> 02:32:55,082
She's been speared.
How'd she make it this far?

1092
02:33:01,548 --> 02:33:03,465
Let's go!

1093
02:33:10,056 --> 02:33:12,182
Damn it, what is it now?

1094
02:33:15,395 --> 02:33:18,063
This baby... is me.

1095
02:33:18,565 --> 02:33:21,066
This is just
what happened to me!

1096
02:34:29,844 --> 02:34:31,762
Here we go!

1097
02:34:40,480 --> 02:34:42,564
what the hell?

1098
02:34:56,829 --> 02:34:59,331
what the hell
were you staring at?

1099
02:35:00,500 --> 02:35:02,084
Idiot!

1100
02:36:04,397 --> 02:36:06,440
No one wounded?

1101
02:36:06,816 --> 02:36:09,276
Good.
You did a fine job.

1102
02:36:09,444 --> 02:36:11,111
Fine job!

1103
02:36:14,449 --> 02:36:16,700
Gunpowder!
Take cover!

1104
02:36:27,211 --> 02:36:28,920
Manzo!

1105
02:36:42,685 --> 02:36:44,644
where were you hit?

1106
02:36:45,146 --> 02:36:48,315
Shino! Shino!
Bring me my daughter.

1107
02:36:49,525 --> 02:36:50,942
Don't bother.

1108
02:36:51,319 --> 02:36:54,237
If this kills you,
you'd die of a fleabite.

1109
02:36:55,448 --> 02:36:58,033
You make a ruckus
over a little scratch

1110
02:36:58,201 --> 02:37:02,079
and blow your daughter's cover
in the process. Nice going!

1111
02:37:31,442 --> 02:37:33,693
You don't have
to chase them all down.

1112
02:37:37,156 --> 02:37:39,199
That's far enough.
well done.

1113
02:37:39,951 --> 02:37:41,868
who are you?

1114
02:37:43,746 --> 02:37:45,497
Rikichi.

1115
02:38:00,471 --> 02:38:03,014
They've attacked from the east,
west and south

1116
02:38:03,182 --> 02:38:06,143
and run away each time
with their tails between their legs.

1117
02:38:06,310 --> 02:38:08,061
This is the only approach left.

1118
02:38:08,229 --> 02:38:10,856
we don't know
if they'll come tonight,

1119
02:38:11,023 --> 02:38:13,150
but when they do,
they'll mass their forces here.

1120
02:38:13,317 --> 02:38:15,026
Perhaps, but...

1121
02:38:15,695 --> 02:38:17,779
I don't hear a thing.

1122
02:38:30,877 --> 02:38:32,586
Nevertheless,

1123
02:38:33,337 --> 02:38:35,672
this will surely
be the focus of their attack.

1124
02:38:36,090 --> 02:38:38,049
I'll prove it to you in a minute.

1125
02:39:22,053 --> 02:39:23,428
Good work.

1126
02:39:23,596 --> 02:39:26,640
Now poke that scarecrow out
from behind those trees.

1127
02:40:01,175 --> 02:40:04,302
I'd say tomorrow morning

1128
02:40:04,595 --> 02:40:07,097
they'll attack us here
with everything they've got.

1129
02:40:07,265 --> 02:40:10,183
And we'll let them in.

1130
02:40:14,105 --> 02:40:17,274
Don't worry.
I mean we'll let one in.

1131
02:40:18,317 --> 02:40:20,318
Two at most.

1132
02:40:21,320 --> 02:40:24,990
Once they're in,
we form a wall again with our spears.

1133
02:40:25,700 --> 02:40:28,576
The one or two who get in
are as good as dead.

1134
02:40:28,744 --> 02:40:30,829
we can cook 'em up
any way we want.

1135
02:40:33,082 --> 02:40:37,669
we'll pick them off patiently,
one by one, until the final showdown.

1136
02:40:37,837 --> 02:40:39,879
Those muskets worry me.

1137
02:40:40,047 --> 02:40:42,215
If only we could
get one of them.

1138
02:40:44,802 --> 02:40:48,179
I'll go.
I swear I'll get one!

1139
02:40:48,347 --> 02:40:51,266
No. You're looking to die.
I'll go.

1140
02:41:44,403 --> 02:41:46,321
Footsteps! Listen!

1141
02:41:46,489 --> 02:41:49,741
That's enough.
Get some rest.

1142
02:41:49,909 --> 02:41:52,911
It's true! I hear them!
Listen.

1143
02:41:53,079 --> 02:41:55,205
I said enough.

1144
02:41:56,082 --> 02:41:59,209
You're exhausted.
Get some rest.

1145
02:42:01,962 --> 02:42:03,671
I hear them.

1146
02:42:31,826 --> 02:42:33,576
Two more down.

1147
02:43:08,571 --> 02:43:09,779
what is it?

1148
02:43:12,867 --> 02:43:16,995
State your business.
I'm going to get some sleep.

1149
02:43:18,456 --> 02:43:21,958
You are a magnificent person.

1150
02:43:26,338 --> 02:43:30,383
I've wanted to tell you so
for some time.

1151
02:43:56,368 --> 02:43:58,119
They're here.

1152
02:44:02,208 --> 02:44:04,209
we'll let one in.

1153
02:44:07,004 --> 02:44:08,963
we're letting one in!

1154
02:44:16,388 --> 02:44:20,892
Remember, after the first one's in,
jump out with your spears.

1155
02:44:39,787 --> 02:44:41,037
Here they come.

1156
02:45:16,991 --> 02:45:18,741
Step aside!

1157
02:45:21,287 --> 02:45:22,829
Good work.

1158
02:45:30,546 --> 02:45:33,631
what's wrong? You did well.

1159
02:45:34,133 --> 02:45:36,050
Here he comes! Scatter!

1160
02:45:53,611 --> 02:45:55,820
Fall back! Fall back!

1161
02:46:01,452 --> 02:46:03,536
After them!

1162
02:46:11,837 --> 02:46:13,504
Another on the way!

1163
02:47:55,816 --> 02:47:57,567
Here he comes.

1164
02:48:13,792 --> 02:48:15,626
watch this!

1165
02:48:21,550 --> 02:48:24,260
Having fun with your horsey?

1166
02:48:46,033 --> 02:48:50,578
They've stopped.
won't fall for that trick again, eh?

1167
02:48:59,505 --> 02:49:02,673
They're all wimps!
who's scared of bandits anyway?

1168
02:49:09,598 --> 02:49:14,852
That little skirmish just cost them four.
Kyuzo got two last night.

1169
02:49:31,453 --> 02:49:33,704
That man is a true samurai.

1170
02:49:34,039 --> 02:49:36,707
He's fearless,
his swordsmanship is amazing,

1171
02:49:36,875 --> 02:49:38,584
and yet he's kind too.

1172
02:49:38,752 --> 02:49:42,463
He never once boasted
about capturing that musket.

1173
02:49:42,881 --> 02:49:47,385
He walked into a forest filled with bandits
as if on a mushroom hunt.

1174
02:49:48,762 --> 02:49:53,057
Fascinating.
I'm not bored at all, I swear.

1175
02:50:10,909 --> 02:50:12,827
Hey, Yohei.

1176
02:50:13,704 --> 02:50:15,246
Take over for me.

1177
02:50:18,375 --> 02:50:21,419
what's that face for?

1178
02:50:21,587 --> 02:50:23,754
There's no danger here now.

1179
02:50:25,340 --> 02:50:27,508
You make a great scarecrow.

1180
02:51:58,976 --> 02:52:00,267
Hear me good!

1181
02:52:01,353 --> 02:52:03,729
If anybody else turns yellow -

1182
02:52:09,903 --> 02:52:11,278
Out of my way!

1183
02:53:34,780 --> 02:53:36,030
Hey!

1184
02:53:39,785 --> 02:53:40,951
How's it goin'?

1185
02:53:41,119 --> 02:53:43,162
Man, they're a pain.

1186
02:53:43,455 --> 02:53:45,581
won't be long now.

1187
02:53:45,999 --> 02:53:49,251
Everything's upside down.

1188
02:53:49,461 --> 02:53:53,297
They burn us out,
and we starve like farmers.

1189
02:53:54,132 --> 02:53:56,967
Quit your moaning.
There are better times ahead.

1190
02:53:57,135 --> 02:53:59,470
Do your part, man.

1191
02:54:39,177 --> 02:54:41,345
Hey, it's me!

1192
02:54:48,603 --> 02:54:50,354
Serves you right, you dogs!

1193
02:54:50,522 --> 02:54:51,522
Fool!

1194
02:54:52,691 --> 02:54:54,692
why did you leave your post?

1195
02:54:54,860 --> 02:54:56,235
Just look at this!

1196
02:54:56,403 --> 02:55:00,030
Don't scold me, man.
My post is fine.

1197
02:55:00,866 --> 02:55:04,410
There's nothing heroic
about selfishly grabbing for glory.

1198
02:55:04,578 --> 02:55:08,789
Listen to me:
war is not fought alone!

1199
02:55:19,176 --> 02:55:22,219
Gorobei and Kyuzo,
guard this post!

1200
02:55:27,601 --> 02:55:29,643
Let no one pass!

1201
02:57:37,564 --> 02:57:40,357
Stop, you asses!

1202
02:57:40,525 --> 02:57:42,234
Damn you!

1203
02:57:42,861 --> 02:57:44,862
Damn it! Two made it in!

1204
02:58:00,545 --> 02:58:03,589
Goddamn it!

1205
02:58:04,299 --> 02:58:05,883
where's Yohei?

1206
02:58:45,882 --> 02:58:50,260
Yohei!

1207
02:58:50,762 --> 02:58:53,889
I defended my post.

1208
02:58:54,057 --> 02:58:56,725
Don't give up, Yohei!

1209
02:59:00,105 --> 02:59:01,939
Go ahead, shoot me!

1210
02:59:39,978 --> 02:59:41,687
Shichiroji, take over!

1211
02:59:52,949 --> 03:00:06,503
Gorobei!

1212
03:00:58,431 --> 03:01:00,724
Just 13 left.

1213
03:01:01,309 --> 03:01:03,352
But these last seven...

1214
03:01:04,604 --> 03:01:06,730
came at a steep price.

1215
03:01:27,919 --> 03:01:30,587
How are you? Tired?

1216
03:01:32,507 --> 03:01:36,426
Poor man.
You've lost a lot of weight.

1217
03:01:40,598 --> 03:01:43,141
I'll go throw
some water on my face.

1218
03:01:53,736 --> 03:01:56,446
Next time they come,
we fight to the finish.

1219
03:01:56,614 --> 03:02:00,867
It's better we fight it out
before we're spent.

1220
03:02:01,119 --> 03:02:04,663
when do you think
they'll attack?

1221
03:02:06,082 --> 03:02:09,084
They're exhausted too,
and a few are wounded.

1222
03:02:09,502 --> 03:02:11,628
They won't come tonight.

1223
03:02:11,796 --> 03:02:17,009
But they have no food,
and their ranks are splitting.

1224
03:02:17,927 --> 03:02:20,012
They can't afford
to dawdle either.

1225
03:02:20,263 --> 03:02:26,435
I say they'll come at us like hell
tomorrow morning.

1226
03:02:27,812 --> 03:02:29,479
Katsushiro.

1227
03:02:48,958 --> 03:02:50,459
An order from above.

1228
03:02:50,627 --> 03:02:53,795
Place two on watch
and let the rest sleep.

1229
03:02:54,505 --> 03:02:58,508
The men may visit their families
one at a time.

1230
03:03:00,303 --> 03:03:01,845
So tomorrow's the showdown?

1231
03:03:03,848 --> 03:03:06,058
Yes.
Please carry out the order.

1232
03:03:12,774 --> 03:03:16,568
You all heard what he just said.

1233
03:03:20,573 --> 03:03:22,991
I'll stand guard.

1234
03:03:23,618 --> 03:03:25,494
The rest of you sleep.

1235
03:03:26,537 --> 03:03:29,706
Manzo...

1236
03:03:30,500 --> 03:03:32,542
you go home first.

1237
03:03:32,960 --> 03:03:35,379
Take a good look
at your daughter -

1238
03:03:36,172 --> 03:03:38,423
I mean, your son.

1239
03:03:47,433 --> 03:03:48,725
I told them.

1240
03:03:48,893 --> 03:03:51,061
All right. Get some rest.

1241
03:03:55,108 --> 03:03:57,442
Katsushiro.

1242
03:03:58,403 --> 03:03:59,945
How was Kikuchiyo?

1243
03:04:00,113 --> 03:04:03,198
Still beside the grave.

1244
03:04:03,449 --> 03:04:04,741
I see.

1245
03:05:18,065 --> 03:05:20,901
Are we all going
to die tomorrow?

1246
03:05:21,068 --> 03:05:24,154
There's no way to know.

1247
03:05:24,781 --> 03:05:27,324
But we might!

1248
03:05:49,555 --> 03:05:50,972
Shino.

1249
03:05:51,599 --> 03:05:53,266
where's Shino?

1250
03:05:58,940 --> 03:06:00,524
Anyone seen Shino?

1251
03:06:34,976 --> 03:06:37,561
Sake, eh?
where'd you find it?

1252
03:06:52,869 --> 03:06:55,912
I see. They have stockpiles,
just like Kikuchiyo said,

1253
03:06:56,080 --> 03:06:58,081
and tonight it all comes out.

1254
03:07:07,466 --> 03:07:10,093
I think I'll help myself.

1255
03:07:13,806 --> 03:07:15,390
Shino!

1256
03:07:41,167 --> 03:07:44,252
Here's some sake.
Drink up and get some sleep.

1257
03:07:49,508 --> 03:07:53,803
This is hardly like you.
You must rest for the battle tomorrow.

1258
03:08:05,358 --> 03:08:07,442
Shino!

1259
03:09:12,591 --> 03:09:14,467
You tramp!

1260
03:09:23,936 --> 03:09:27,022
You wench!

1261
03:09:30,901 --> 03:09:33,069
Stop this brutality!

1262
03:09:33,237 --> 03:09:37,574
what the hell's a farmer girl
doing with a samurai?

1263
03:10:03,017 --> 03:10:04,684
You slut!

1264
03:10:14,820 --> 03:10:16,404
Manzo.

1265
03:10:17,281 --> 03:10:19,783
Is this your daughter?

1266
03:10:26,248 --> 03:10:28,124
Tell me what happened.

1267
03:10:28,292 --> 03:10:32,629
You mentioned a samurai.
who was it?

1268
03:10:34,215 --> 03:10:35,757
Manzo!

1269
03:10:45,476 --> 03:10:47,310
Manzo, say something.

1270
03:10:48,395 --> 03:10:49,979
Speak!

1271
03:11:22,346 --> 03:11:24,514
Are you Shino?

1272
03:11:43,742 --> 03:11:46,953
Manzo, don't be angry.

1273
03:11:48,414 --> 03:11:51,499
when the dawn threatens
our very lives,

1274
03:11:51,667 --> 03:11:55,003
the weight of it
makes us all a little reckless.

1275
03:12:00,843 --> 03:12:03,386
On the eve of decisive battles...

1276
03:12:04,930 --> 03:12:07,682
this often happens,
even inside castles.

1277
03:12:10,561 --> 03:12:14,606
Remember what it was to be young.
You can't blame them.

1278
03:12:15,566 --> 03:12:17,650
I can't forgive them.

1279
03:12:17,902 --> 03:12:21,070
I can't stand by when my only daughter
has been made damaged goods.

1280
03:12:35,628 --> 03:12:40,256
what's wrong with two people in love?
It's not like bandits took her!

1281
03:14:12,683 --> 03:14:16,936
They're wound up tight.
we need to loosen them up.

1282
03:14:25,029 --> 03:14:28,281
Everyone, the final battle
is here at last.

1283
03:14:31,285 --> 03:14:35,538
By the way, Katsushiro,
we expect much of you today.

1284
03:14:37,291 --> 03:14:40,376
As of last night,
you became a real man.

1285
03:14:58,395 --> 03:14:59,937
Hey!

1286
03:15:02,900 --> 03:15:06,027
where's that fighting spirit?

1287
03:15:07,780 --> 03:15:11,366
You'll never win
with such long faces!

1288
03:15:24,922 --> 03:15:27,090
Kikuchiyo, what are you up to?

1289
03:15:27,257 --> 03:15:29,592
I can't kill five
with just one blade.

1290
03:15:45,275 --> 03:15:47,193
There are 13 left.

1291
03:15:48,362 --> 03:15:52,323
we'll let them all in.

1292
03:15:53,909 --> 03:15:56,327
Once they pass this point,

1293
03:15:56,829 --> 03:16:00,706
we close in from all sides
at the crossing.

1294
03:16:03,627 --> 03:16:07,755
Everything's riding
on this battle!

1295
03:16:38,036 --> 03:17:05,855
Here they come!

1296
03:17:30,297 --> 03:17:32,507
Shichiroji and Katsushiro,
go west!

1297
03:17:32,758 --> 03:17:35,051
Kyuzo, Kikuchiyo, east!

1298
03:19:16,528 --> 03:19:19,488
Katsushiro! Rikichi!

1299
03:19:19,656 --> 03:19:22,325
East! Go east!

1300
03:19:22,492 --> 03:19:24,368
East!

1301
03:19:41,428 --> 03:19:43,220
Shut up!

1302
03:19:43,680 --> 03:19:45,890
Scream and you're dead!

1303
03:20:33,271 --> 03:20:35,981
we did it!

1304
03:20:36,149 --> 03:20:38,901
Head east!

1305
03:20:54,251 --> 03:20:56,627
Katsushiro, pull back!

1306
03:20:59,131 --> 03:21:01,382
Damn you!

1307
03:21:03,093 --> 03:21:42,840
Kikuchiyo!

1308
03:21:53,226 --> 03:21:56,312
where are the bandits?

1309
03:21:56,480 --> 03:21:58,481
They're all dead!

1310
03:22:16,792 --> 03:22:19,627
Once more we survive.

1311
03:25:57,804 --> 03:26:01,515
In the end,
we lost this battle too.

1312
03:26:02,392 --> 03:26:03,642
what?

1313
03:26:04,477 --> 03:26:06,103
I mean,

1314
03:26:06,479 --> 03:26:09,064
the victory belongs to those peasants.

1315
03:26:10,358 --> 03:26:12,192
Not to us.

1316
03:26:41,431 --> 03:26:46,310
THE END

1317
03:26:47,310 --> 03:26:57,310
Downloaded From www.AllSubs.org

*/});
}
