SRC_JS = \
	src/js/security_validator.js \
	src/js/tokenizer.js \
	src/js/synonym_expander.js \
	src/js/semantic_scorer.js \
	src/js/vector_scorer.js \
	src/js/string_compression.js \
	src/js/sequence_diagram/sequence_models.js \
	src/js/sequence_diagram/sequence_lexer.js \
	src/js/sequence_diagram/sequence_parser.js \
	src/js/sequence_diagram/sequence_svg_renderer.js \
	src/js/sequence_diagram/index.js \
	src/js/sequence_renderer.js \
	src/js/fm_index_engine.js \
	src/js/frameworks/dom-utils.js \
	src/js/frameworks/event.js \
	src/js/frameworks/publisher.js \
	src/js/frameworks/router.js \
	src/js/frameworks/scene.js \
	src/js/spa_app.js

MIN_JS = site/fm_index_engine.min.js

.PHONY: all build clean

all: build

build: $(MIN_JS)
	@echo "🛠️ docs/ 配下の HTML ビルドを実行中..."
	python3 scripts/build_content_json.py
	python3 scripts/build_html_docs.py

$(MIN_JS): $(SRC_JS)
	@echo "🛠️ Closure Compiler (超極限厳格設定: ADVANCED_OPTIMIZATIONS & VERBOSE & 全正規型/変数判定ルール Error化) で全 JS モジュールをコンパイル中..."
	./node_modules/.bin/google-closure-compiler \
		$(foreach js,$(SRC_JS),--js $(js)) \
		--js_output_file $(MIN_JS) \
		--compilation_level ADVANCED_OPTIMIZATIONS \
		--warning_level VERBOSE \
		--jscomp_error=checkTypes \
		--jscomp_error=checkVars \
		--jscomp_error=missingProperties \
		--jscomp_error=strictModuleChecks \
		--jscomp_error=globalThis \
		--jscomp_error=uselessCode \
		--jscomp_error=visibility \
		--jscomp_error=invalidCasts \
		--jscomp_error=duplicate \
		--use_types_for_optimization true \
		--language_in ECMASCRIPT_NEXT \
		--language_out ECMASCRIPT_2020 \
		--strict_mode_input true
	@echo "✅ 全 JS モジュールの超極限厳格コンパイル完了: $(MIN_JS)"

clean:
	@echo "🧹 コンパイル成果物を削除中..."
	rm -f $(MIN_JS)
	@echo "✅ 削除完了"
