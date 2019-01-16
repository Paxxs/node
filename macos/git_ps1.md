```
curl -o ~/.git-prompt.sh \
    https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh
```

```
if [ -f ~/.git-prompt.sh ]; then
  source ~/.git-prompt.sh
  export PS1='Geoff[\W]$(__git_ps1 "(%s)"): '
fi
```
