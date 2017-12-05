只需要vimrc里面加一个稍微复杂一点的autocmd就搞定了：

```
if has("autocmd")
  au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif
endif
```
