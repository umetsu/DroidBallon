sys = require 'sys'
exec = (require 'child_process').exec

FILENAME = 'game' # write your game title.
FILES = [
  './src/R.coffee'
  './src/SpritePool.coffee'
  './src/Settings.coffee'
  './src/Main.coffee'
  './src/HighScoreScene.coffee'
  './src/TitleScene.coffee'
  './src/GameScene.coffee'
  './src/World.coffee'
  './src/Background.coffee'
  './src/Droid.coffee'
  './src/EnemyDroid.coffee'
  './src/Item.coffee'
  './src/ScoreUpLabel.coffee'
  './src/Explosion.coffee'
  # write sourcecodes here.
]

task 'compile', "compile #{FILENAME}.", (options) ->
  outputErr = (err, stdout, stderr) ->
    throw err if err
    if stdout or stderr
      console.log "#{stdout} #{stderr}"
  if FILES.length is 1
    exec "coffee -o js/ -c #{FILES[0]}", outputErr
  else
    exec "coffee -o js/ -cj #{FILENAME} #{FILES.join ' '}", outputErr
