ENV_PATH=
#0622 更新scripts目录wyw
# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

# 更新js脚本和shell脚本，并替换相关参数：
12 12 * * * bash MY_PATH/git_pull.sh >> MY_PATH/log/git_pull.log 2>&1
12 10 * * * bash MY_PATH/pull.sh
# 删除 RmLogDaysAgo 指定天数以前的旧日志，本行为不记录日志：
57 13 * * * bash MY_PATH/rm_log.sh >/dev/null 2>&1

# 导出所有互助码清单，日志在log/export_sharecodes下(可通过面板或者日记查看)：
48 * * * * bash MY_PATH/export_sharecodes.sh
40 * * * *

# 重启挂机脚本：
# 33 13 * * * bash MY_PATH/jd.sh hangup
  
# 自定义定时区，添加自己其他想加的定时任务:


# 运行lxk0301大佬的js脚本，仅列出长期任务作初始化用，AutoAddCron=true时，将自动添加短期任务。
# 请保留任务名称中的前缀"jd_"，去掉后缀".js"，如果有些任务你不想运行，注释掉就好了，不要删除。否则会重新添加上。
# 非lxk0301/jd_scripts仓库中的脚本不能以“jd_”、“jr_”、“jx_”开头。请在最后保留一个空行。
0 10 * * * bash MY_PATH/jd.sh jd_bean_change
33 0-23/4 * * * bash MY_PATH/jd.sh jd_bean_home
0 0 * * * bash MY_PATH/jd.sh jd_bean_sign
1 7,12,19 * * * bash MY_PATH/jd.sh jd_beauty
0 * * * * bash MY_PATH/jd.sh jd_big_winner
0 0 * * * bash MY_PATH/jd.sh jd_blueCoin
0 0 * * * bash MY_PATH/jd.sh jd_blueCoin20
7 8,12,18 * * * bash MY_PATH/jd.sh jd_bookshop
0 0 * * * bash MY_PATH/jd.sh jd_car
0 0 * * * bash MY_PATH/jd.sh jd_car_exchange
27 6,18,15 * * * bash MY_PATH/jd.sh jd_cash
0 0 * * * bash MY_PATH/jd.sh jd_cash_exchange
30 * * * * bash MY_PATH/jd.sh jd_cfd
0 0 * * * bash MY_PATH/jd.sh jd_club_lottery
10 7 * * * bash MY_PATH/jd.sh jd_crazy_joy
1 1 * * * bash MY_PATH/jd.sh  jd_crazy_joy_coin
18 * * * * bash MY_PATH/jd.sh jd_daily_egg
13 1,22,23 * * * bash MY_PATH/jd.sh jd_daily_lottery
35 2 * * * bash MY_PATH/jd.sh  jd_daydlt
18 1,10 * * * bash MY_PATH/jd.sh jd_djjl
13 10 * * * bash MY_PATH/jd.sh jd_dpqd
8 9 * * * bash MY_PATH/jd.sh jd_dpqd2
20 * * * * bash MY_PATH/jd.sh jd_dreamFactory
40 3 * * * bash MY_PATH/jd.sh  jd_factory
51 10 * * * bash MY_PATH/jd.sh jd_family
45 4 * * * bash MY_PATH/jd.sh  jd_fanslove
45 3 * * * bash MY_PATH/jd.sh  jd_friend
5 6-18/6 * * * bash MY_PATH/jd.sh jd_fruit
47 7 * * * bash MY_PATH/jd.sh jd_get_share_code
38 2 * * * bash MY_PATH/jd.sh  jd_getFanslove
30 * * * * bash MY_PATH/jd.sh  jd_half_redrain
13 1,7,22 * * * bash MY_PATH/jd.sh jd_health
5-45/20 * * * * bash MY_PATH/jd.sh jd_health_collect
28 2 * * * bash MY_PATH/jd.sh  jd_jbczy
30 0,1,2 * * * bash MY_PATH/jd.sh jd_jdzz
15 6 * * * bash MY_PATH/jd.sh  jd_jintie
25 12 * * * bash MY_PATH/jd.sh  jd_jintie_wx
15 */2 * * * bash MY_PATH/jd.sh jd_joy
15 */1 * * * bash MY_PATH/jd.sh jd_joy_feedPets
0 0,8,12,16 * * * bash MY_PATH/jd.sh jd_joy_reward
10 10-20/2 * * * bash MY_PATH/jd.sh jd_joy_run
11 2 * * * bash MY_PATH/jd.sh  jd_joy_steal
0 0 * * * bash MY_PATH/jd.sh  jd_joy500
1 0,11,21 * * * bash MY_PATH/jd.sh jd_jump
38 5 * * * bash MY_PATH/jd.sh  jd_jxd
8 7 * * * bash MY_PATH/jd.sh  jd_jxfactory
0 6,9,12,18 * * * bash MY_PATH/jd.sh jd_jxnc
23 1 * * * bash MY_PATH/jd.sh jd_kd
10-20/5 12 * * * bash MY_PATH/jd.sh jd_live
0 3,9,18 * * * bash MY_PATH/jd.shjd_jxlhb
28 14 * * * bash MY_PATH/jd.sh  jd_live_lottery_social
0,30 0-23/1 * * * bash MY_PATH/jd.sh jd_live_redrain
22 0,12,18 * * * bash MY_PATH/jd.sh jd_lotteryMachine
38 13 * * * bash MY_PATH/jd.sh  jd_market_lottery
28 15 * * * bash MY_PATH/jd.sh  jd_mgold
0 */4 * * * bash MY_PATH/jd.sh jd_mohe
0 */2 * * * bash MY_PATH/jd.sh jd_moneyTree
10 7 * * * bash MY_PATH/jd.sh jd_ms
5 1,10 * * * bash MY_PATH/jd.sh  jd_necklace
1 16 * * * bash MY_PATH/jd.sh  jd_opencard
5 6-18/6 * * * bash MY_PATH/jd.sh jd_pet
8 9 * * * bash MY_PATH/jd.sh  jd_petTreasureBox
12 * * * * bash MY_PATH/jd.sh jd_pigPet
0 */6 * * * bash MY_PATH/jd.sh jd_plantBean
8 9 * * * bash MY_PATH/jd.sh  jd_plus_bean
11 9 * * * bash MY_PATH/jd.sh jd_rankingList
1 1 * * * bash MY_PATH/jd.sh jd_redPacket
27 8 * * * bash MY_PATH/jd.sh jd_sgmh
26 5 * * * bash MY_PATH/jd.sh  jd_shake
10 0 * * * bash MY_PATH/jd.sh jd_shop
22 2 * * * bash MY_PATH/jd.sh  jd_shop_follow_sku
12 1 * * * bash MY_PATH/jd.sh  jd_shop_lottery
58 8 * * * bash MY_PATH/jd.sh jd_ShopSign
16 6,23 * * * bash MY_PATH/jd.sh jd_small_home
10 0,1 * * * bash MY_PATH/jd.sh  jd_speed
40 0,8 * * * bash MY_PATH/jd.sh jd_speed_redpocke
48 0,12,18 * * * bash MY_PATH/jd.sh jd_speed_sign
0 1,21 * * * bash MY_PATH/jd.sh jd_star_shop
0 0-23 * * * bash MY_PATH/jd.sh  jd_super_redrain
11 */6 * * * bash MY_PATH/jd.sh jd_superMarket
36 0-23/4 * * * bash MY_PATH/jd.sh jd_syj
58 5 * * * bash MY_PATH/jd.sh jd_try
38 17 * * * bash MY_PATH/jd.sh  jd_unbind
15 0-23/4 * * * bash MY_PATH/jd.sh jd_unsubscribe
1 0 * * * bash MY_PATH/jd.sh jx_cfdtx
18 3 * * * bash MY_PATH/jd.sh jx_sign
0 0-23/1 * * * bash MY_PATH/jd.sh jd_super_redrain
22 3 * * * bash MY_PATH/jd.sh jd_tyt
29 3 * * * bash MY_PATH/jd.sh jd_ddo_pk



