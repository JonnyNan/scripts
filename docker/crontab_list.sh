ENV_PATH=
#0616 更新scripts目录wyw
# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

# 更新js脚本和shell脚本，并替换相关参数：
#12 12 * * * bash MY_PATH/git_pull.sh >> MY_PATH/log/git_pull.log 2>&1
11 11 * * * bash MY_PATH/pull.sh
# 删除 RmLogDaysAgo 指定天数以前的旧日志，本行为不记录日志：
57 13 * * * bash MY_PATH/rm_log.sh >/dev/null 2>&1

# 导出所有互助码清单，日志在log/export_sharecodes下(可通过面板或者日记查看)：
48 * * * * bash MY_PATH/export_sharecodes.sh

# 重启挂机脚本：
# 33 13 * * * bash MY_PATH/jd.sh hangup
  
# 自定义定时区，添加自己其他想加的定时任务:


# 运行lxk0301大佬的js脚本，仅列出长期任务作初始化用，AutoAddCron=true时，将自动添加短期任务。
# 请保留任务名称中的前缀"jd_"，去掉后缀".js"，如果有些任务你不想运行，注释掉就好了，不要删除。否则会重新添加上。
# 非lxk0301/jd_scripts仓库中的脚本不能以“jd_”、“jr_”、“jx_”开头。请在最后保留一个空行。
0 10 * * * bash MY_PATH/jd.sh jd_bean_change
6 1,5 * * * bash MY_PATH/jd.sh jd_bean_home
0 0,6 * * * cd /scripts && node jd_bean_sign
1 7,12,19 * * * bash MY_PATH/jd.sh jd_beauty
0,30 0 * * * bash MY_PATH/jd.sh jd_blueCoin
7 8,12,18 * * * bash MY_PATH/jd.sh jd_bookshop
0 0 * * * bash MY_PATH/jd.sh jd_car
0 0 * * * bash MY_PATH/jd.sh jd_car_exchange
0 0-18/6 * * * bash MY_PATH/jd.sh jd_carnivalcity
17 1,18,15 * * * bash MY_PATH/jd.sh jd_cash
30 * * * * bash MY_PATH/jd.sh jd_cfd
0 8 * * * bash MY_PATH/jd.sh jd_club_lottery
10 7 * * * bash MY_PATH/jd.sh jd_crazy_joy
18 0-23/6 * * * bash MY_PATH/jd.sh jd_daily_egg
13 1,22,23 * * * bash MY_PATH/jd.sh jd_daily_lottery
30 * * * * bash MY_PATH/jd.sh jd_dreamFactory
5 6-18/6 * * * bash MY_PATH/jd.sh jd_fruit
47 7 * * * bash MY_PATH/jd.sh jd_get_share_code
13 1,7,22 * * * bash MY_PATH/jd.sh jd_health
5-45/20 * * * * bash MY_PATH/jd.sh jd_health_collect
36 */4 * * * bash MY_PATH/jd.sh jd_jdfactory
30 0,1,8 * * * bash MY_PATH/jd.sh jd_jdzz
15 */2 * * * bash MY_PATH/jd.sh jd_joy
15 */1 * * * bash MY_PATH/jd.sh jd_joy_feedPets
0 0,8,12,16 * * * bash MY_PATH/jd.sh jd_joy_reward
10 10-20/2 * * * bash MY_PATH/jd.sh jd_joy_run
1 0,11,21 * * * bash MY_PATH/jd.sh jd_jump
10 6,9,12,18,21 * * * bash MY_PATH/jd.sh jd_jxnc
23 1 * * * bash MY_PATH/jd.sh jd_kd
10-20/5 12 * * * bash MY_PATH/jd.sh jd_live
0,30 0-23/1 * * * bash MY_PATH/jd.sh jd_live_redrain
22 0,12,18 * * * bash MY_PATH/jd.sh jd_lotteryMachine
0 */4 * * * bash MY_PATH/jd.sh jd_mohe
0 */6 * * * bash MY_PATH/jd.sh jd_moneyTree
10 7 * * * bash MY_PATH/jd.sh jd_ms
35 1,22 * * * bash MY_PATH/jd.sh jd_nzmh
5 6-18/6 * * * bash MY_PATH/jd.sh jd_pet
12 6-18/6 * * * bash MY_PATH/jd.sh jd_pigPet
0 */6 * * * bash MY_PATH/jd.sh jd_plantBean
11 9 * * * bash MY_PATH/jd.sh jd_rankingList
1 1 * * * bash MY_PATH/jd.sh jd_redPacket
27 8 * * * bash MY_PATH/jd.sh jd_sgmh
10 0 * * * bash MY_PATH/jd.sh jd_shop
16 6,23 * * * bash MY_PATH/jd.sh jd_small_home
40 0,8 * * * bash MY_PATH/jd.sh jd_speed_redpocke
48 0,12,18 * * * bash MY_PATH/jd.sh jd_speed_sign
0 1,21 * * * bash MY_PATH/jd.sh jd_star_shop
11 */6 * * * bash MY_PATH/jd.sh jd_superMarket
36 0-23/4 * * * bash MY_PATH/jd.sh jd_syj
55 0-23/4 * * * bash MY_PATH/jd.sh jd_unsubscribe
19 10 * * * bash MY_PATH/jd.sh adolf_pk
17 12 * * * bash MY_PATH/jd.sh diy_adolf_flp
16 11 * * * bash MY_PATH/jd.sh diy_adolf_oneplus
51 10 * * * bash MY_PATH/jd.sh jd_family
21 11 * * * bash MY_PATH/jd.sh jdtqz
58 5 * * * bash MY_PATH/jd.sh jd_xtg
22 2 * * * bash MY_PATH/jd.sh jd_ShopSign
22 2 * * * bash MY_PATH/jd.sh jd_limitBox
22 2 * * * bash MY_PATH/jd.sh jd_qqtmy
36 0-23/4 * * * bash MY_PATH/jd.sh jd_try
22 3 * * * bash MY_PATH/jd.sh jd_Newsyj
59 23 * * * bash MY_PATH/jd.sh jd_blueCoin20
25 4 * * * bash MY_PATH/jd.sh jd_cash_exchange
27 4 * * * bash MY_PATH/jd.sh jd_crazy_joy_coin
28 4 * * * bash MY_PATH/jd.sh jd_daydlt
29 4 * * * bash MY_PATH/jd.sh jd_dphby
32 2,6 * * * bash MY_PATH/jd.sh jd_dpqd
20 2,6 * * * bash MY_PATH/jd.sh jd_dpqd2
32 4 * * * bash MY_PATH/jd.sh jd_factory
33 4 * * * bash MY_PATH/jd.sh jd_fanslove
4 5 * * * bash MY_PATH/jd.sh jd_friend
5 5 * * * bash MY_PATH/jd.sh jd_gcip
6 5 * * * bash MY_PATH/jd.sh jd_getFanslove
7 5 * * * bash MY_PATH/jd.sh jd_global
8 5 * * * bash MY_PATH/jd.sh jd_half_redrain
9 5 * * * bash MY_PATH/jd.sh jd_jbczy
10 5 * * * bash MY_PATH/jd.sh jd_jintie
11 5 * * * bash MY_PATH/jd.sh jd_jintie_wx
12 5 * * * bash MY_PATH/jd.sh jd_joy500
14 5 * * * bash MY_PATH/jd.sh jd_joy_steal
15 5 * * * bash MY_PATH/jd.sh jd_jxd
17 5 * * * bash MY_PATH/jd.sh jd_live_lottery_social
18 5 * * * bash MY_PATH/jd.sh jd_mcxhd_brandcity
19 5 * * * bash MY_PATH/jd.sh jd_monk_pasture
20 8 * * * bash MY_PATH/jd.sh jd_necklace
22 8 * * * bash MY_PATH/jd.sh jd_opencard
23 5 * * * bash MY_PATH/jd.sh jd_petTreasureBox
24 8 * * * bash MY_PATH/jd.sh jd_plus_bean
25 8 * * * bash MY_PATH/jd.sh jd_priceProtect
26 5 * * * bash MY_PATH/jd.sh jd_s5g
27 7 * * * bash MY_PATH/jd.sh jd_shake
28 7 * * * bash MY_PATH/jd.sh jd_shop_follow_sku
29 7 * * * bash MY_PATH/jd.sh jd_shop_lottery
30 5 * * * bash MY_PATH/jd.sh jd_speed
32 3 * * * bash MY_PATH/jd.sh jd_super_box
30 8-21 * * * bash MY_PATH/jd.sh jd_super_redrain
34 2 * * * bash MY_PATH/jd.sh jd_sxj
36 0-23/4 * * * bash MY_PATH/jd.sh jd_try
37 1 * * * bash MY_PATH/jd.sh jd_unbind
39 2 * * * bash MY_PATH/jd.sh jd_wechat_sign
0 0 * * * bash MY_PATH/jd.sh jx_cfdtx
10 8 * * * bash MY_PATH/jd.sh jx_sign
5 6-18/6 * * * bash MY_PATH/jd.sh jx_wsdlb
