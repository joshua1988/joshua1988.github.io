## watch 사용 관련 주의 사항

watch는 해당 데이터가 변했을 때만 동작한다.
props 속성에 같은 값이 연속으로 내려오는 경우 2번째에는 동작을 하지 않음.

## 버그 발생 상황

![watch-before-bug](./watch-before-bug.png)