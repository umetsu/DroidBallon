#
# スコアの保存とか
#
class Settings
    @highScores = []
    @save: ->
        highScores = {
            "highScores": Settings.highScores
        }
        localStorage.setItem 'highScores', JSON.stringify highScores

    @load: ->
        t = localStorage.getItem('highScores')
        highScores = if t? then JSON.parse(t) else {
                "highScores": [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]
            }
        Settings.highScores = highScores.highScores

    @addScore: (score) ->
        Settings.highScores.push score
        Settings.highScores = _.sortBy Settings.highScores, (score) -> return Math.max score
        Settings.highScores.reverse()
        Settings.highScores.splice 10, Settings.highScores.length - 9
